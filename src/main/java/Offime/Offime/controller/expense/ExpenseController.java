package Offime.Offime.controller.expense;

import Offime.Offime.dto.request.expense.ExpenseRequestDTO;
import Offime.Offime.dto.response.expense.ExpenseResponseDTO;
import Offime.Offime.entity.expense.Expense;
import Offime.Offime.entity.expense.ExpenseImage;
import Offime.Offime.entity.expense.ExpenseStatus;
import Offime.Offime.repository.expense.ExpenseImageRepository;
import Offime.Offime.service.expense.ExpenseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    private static final Logger logger = LoggerFactory.getLogger(ExpenseController.class);

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private ExpenseImageRepository expenseImageRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("${file.upload.path}")
    private String imageDirectory;


    // 검색 기능
    @GetMapping("/search")
    public ResponseEntity<?> searchExpenses(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = true) String status) {
        try {
            ExpenseStatus expenseStatus = ExpenseStatus.valueOf(status.toUpperCase());

            List<Expense> expenses = expenseService.searchExpenses(searchTerm, expenseStatus);
            List<ExpenseResponseDTO> responseDTOs = expenses.stream()
                    .map(this::convertToResponseDTO)
                    .collect(Collectors.toList());

            logger.info("Search results: {}", responseDTOs);
            return ResponseEntity.ok(responseDTOs); // 수정된 부분
        } catch (IllegalArgumentException e) {
            logger.error("Invalid status value: {}", status);
            return ResponseEntity.badRequest().body("Invalid status value"); // String 반환
        } catch (Exception e) {
            logger.error("Error searching expenses: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while searching");
        }
    }


    // 게시물 생성 (이미지와 함께)
    @PostMapping
    public ResponseEntity<ExpenseResponseDTO> createExpense(@RequestParam("expenseDTO") String expenseDTOString,
                                                            @RequestParam(value = "images", required = false) List<MultipartFile> images) {
        try {
            ExpenseRequestDTO expenseDTO = objectMapper.readValue(expenseDTOString, ExpenseRequestDTO.class);
            logger.info("Parsed ExpenseRequestDTO in Controller: {}", expenseDTO);

            Expense createdExpense = expenseService.createExpense(expenseDTO, images);
            createdExpense.setStatus(ExpenseStatus.PENDING); // 상태를 대기로 설정
            expenseService.saveExpense(createdExpense);

            ExpenseResponseDTO responseDTO = convertToResponseDTO(createdExpense);
            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);

        } catch (JsonProcessingException e) {
            logger.error("Error parsing ExpenseRequestDTO: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 게시물 상태 변경 (승인)
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/status")
    public ResponseEntity<ExpenseResponseDTO> updateExpenseStatus(@PathVariable Long id,
                                                                  @RequestParam ExpenseStatus status) {
        logger.info("Updating expense status for id: {}, status: {}", id, status); // 요청 파라미터 로깅

        try {
            Expense expense = expenseService.getExpense(id);
            if (expense == null) {
                logger.warn("Expense not found for id: {}", id); // 경비 찾기 실패 로깅
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            // 상태 업데이트
            expense.setStatus(status);
            expenseService.saveExpense(expense);
            logger.info("Expense status updated successfully for id: {}", id); // 상태 업데이트 성공 로깅

            ExpenseResponseDTO responseDTO = convertToResponseDTO(expense);
            return ResponseEntity.ok(responseDTO);

        } catch (Exception e) {
            logger.error("Error updating expense status: {}", e.getMessage(), e); // 오류 메시지 로깅
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // 게시물 목록 조회 (전체/대기 상태)
    @GetMapping
    public List<ExpenseResponseDTO> getExpenses(@RequestParam(required = false) ExpenseStatus status) {
        List<Expense> expenses = (status != null)
                ? expenseService.getExpensesByStatus(status)
                : expenseService.getExpenses();

        return expenses.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // 게시물 조회 (id로)
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> getExpense(@PathVariable Long id) {
        Expense expense = expenseService.getExpense(id);
        if (expense == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(convertToResponseDTO(expense));
    }

    // 게시물 수정
    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> updateExpense(@PathVariable Long id,
                                                            @RequestParam("expenseDTO") String expenseDTOString,
                                                            @RequestParam(value = "images", required = false) List<MultipartFile> images,
                                                            @RequestParam(value = "deletedImages", required = false) String deletedImagesJson) {
        try {
            ExpenseRequestDTO expenseDTO = objectMapper.readValue(expenseDTOString, ExpenseRequestDTO.class);

            List<String> deletedImages = (deletedImagesJson != null)
                    ? objectMapper.readValue(deletedImagesJson, new TypeReference<List<String>>() {})
                    : new ArrayList<>();

            Expense updatedExpense = expenseService.updateExpense(id, expenseDTO, images);
            handleImageDeletion(deletedImages);

            return ResponseEntity.ok(convertToResponseDTO(updatedExpense));

        } catch (JsonProcessingException e) {
            logger.error("Error parsing ExpenseRequestDTO: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            logger.error("Error updating expense: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 게시물 삭제
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        try {
            Expense expense = expenseService.getExpense(id);
            if (expense == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            List<ExpenseImage> images = expenseImageRepository.findByExpenseId(id);
            for (ExpenseImage image : images) {
                try {
                    Path path = Paths.get(imageDirectory, image.getImageUrl().substring(image.getImageUrl().lastIndexOf("/") + 1));
                    Files.deleteIfExists(path);
                    expenseImageRepository.delete(image);
                    logger.info("Successfully deleted image: {}", image.getImageUrl());
                } catch (IOException e) {
                    logger.error("Failed to delete image file: {}", image.getImageUrl(), e);
                    throw new RuntimeException("Failed to delete image: " + image.getImageUrl(), e);
                }
            }

            expenseService.deleteExpense(id);
            logger.info("Successfully deleted expense: {}", id);

            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting expense: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 이미지 삭제 처리
    @Transactional
    private void handleImageDeletion(List<String> deletedImages) {
        if (deletedImages != null && !deletedImages.isEmpty()) {
            for (String imageUrl : deletedImages) {
                try {
                    expenseImageRepository.deleteByImageUrl(imageUrl);
                    String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
                    Path path = Paths.get(imageDirectory, fileName);
                    Files.deleteIfExists(path);
                    logger.info("Successfully deleted image: {}", fileName);
                } catch (IOException e) {
                    logger.error("Failed to delete image file: {}", imageUrl, e);
                    throw new RuntimeException("Failed to delete image: " + imageUrl, e);
                }
            }
        }
    }

    @GetMapping("/pending/count")
    public ResponseEntity<?> getPendingExpensesCount(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 토큰이 없습니다.");
        }
        token = token.substring(7); // "Bearer " 제거

        // 토큰 검증 로직...
        try {
            // 토큰 검증 성공
            long count = expenseService.getPendingExpensesCount();
            Map<String, Long> response = new HashMap<>();
            response.put("count", count);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // 토큰 검증 실패
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
        }
    }

    // Entity -> Response DTO 변환
    private ExpenseResponseDTO convertToResponseDTO(Expense expense) {
        ExpenseResponseDTO responseDTO = new ExpenseResponseDTO();
        responseDTO.setId(expense.getId());
        responseDTO.setTitle(expense.getTitle());
        responseDTO.setContent(expense.getContent());
        responseDTO.setUsername(expense.getUsername());
        responseDTO.setAmount(expense.getAmount());
        responseDTO.setCategory(expense.getCategory());
        responseDTO.setStatus(String.valueOf(expense.getStatus()));
        responseDTO.setExpenseDate(expense.getExpenseDate());

        responseDTO.setStatus(expense.getStatus().toString());

        List<String> imageUrls = expenseImageRepository.findByExpenseId(expense.getId()).stream()
                .map(ExpenseImage::getImageUrl)
                .collect(Collectors.toList());
        responseDTO.setImageUrls(imageUrls);

        return responseDTO;
    }
}
