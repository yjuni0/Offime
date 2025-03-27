package Offime.Offime.controller;

import Offime.Offime.dto.request.expense.ExpenseRequestDTO;
import Offime.Offime.dto.response.expense.ExpenseResponseDTO;
import Offime.Offime.entity.expense.Expense;
import Offime.Offime.entity.expense.ExpenseImage;
import Offime.Offime.repository.expense.ExpenseImageRepository;
import Offime.Offime.service.ExpenseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private ExpenseImageRepository expenseImageRepository;

    @Autowired
    private ObjectMapper objectMapper; // ObjectMapper 주입

    @Value("${file.upload.path}") // application.properties에서 경로 읽어오기
    private String imageDirectory;


    private static final Logger logger = LoggerFactory.getLogger(ExpenseController.class);



    // 검색 기능 추가
    @GetMapping("/search")
    public List<Expense> searchExpenses(@RequestParam(required = false) String searchTerm) {
        return expenseService.searchExpenses(searchTerm);
    }


    // 게시물 생성 (이미지와 함께)
    @PostMapping
    public ResponseEntity<ExpenseResponseDTO> createExpense(@RequestParam("expenseDTO") String expenseDTOString,
                                                            @RequestParam(value = "images", required = false) List<MultipartFile> images) {
        try {
            ExpenseRequestDTO expenseDTO = objectMapper.readValue(expenseDTOString, ExpenseRequestDTO.class);
            logger.info("Parsed ExpenseRequestDTO in Controller: {}", expenseDTO); // 추가된 로깅

            Expense createdExpense = expenseService.createExpense(expenseDTO, images);

            // 응답에 필요한 데이터 반환
            ExpenseResponseDTO responseDTO = new ExpenseResponseDTO();
            responseDTO.setId(createdExpense.getId());
            responseDTO.setTitle(createdExpense.getTitle());
            responseDTO.setContent(createdExpense.getContent());
            responseDTO.setAmount(createdExpense.getAmount());
            responseDTO.setCategory(createdExpense.getCategory());
            responseDTO.setExpenseDate(createdExpense.getExpenseDate()); // 응답 DTO에 날짜 설정

            // 이미지 URLs 처리
            List<String> imageUrls = expenseImageRepository.findByExpenseId(createdExpense.getId()).stream()
                    .map(ExpenseImage::getImageUrl)
                    .collect(Collectors.toList());
            responseDTO.setImageUrls(imageUrls);

            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);

        } catch (JsonProcessingException e) {
            logger.error("Error parsing ExpenseRequestDTO: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    // 게시물 조회 (id로)
    @GetMapping("/{id}")
    public ExpenseResponseDTO getExpense(@PathVariable Long id) {
        Expense expense = expenseService.getExpense(id);
        return convertToResponseDTO(expense);
    }

    // 게시물 목록 조회
    @GetMapping
    public List<ExpenseResponseDTO> getExpenses() {
        List<Expense> expenses = expenseService.getExpenses();
        return expenses.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // 게시물 수정 (id로)
    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> updateExpense(
            @PathVariable Long id,
            @RequestParam("expenseDTO") String expenseDTOString,
            @RequestParam(value = "images", required = false) List<MultipartFile> images,
            @RequestParam(value = "deletedImages", required = false) String deletedImagesJson) {

        try {
            // JSON 데이터 변환
            ExpenseRequestDTO expenseDTO = objectMapper.readValue(expenseDTOString, ExpenseRequestDTO.class);

            // 삭제된 이미지 목록 처리
            List<String> deletedImages = (deletedImagesJson != null)
                    ? objectMapper.readValue(deletedImagesJson, new TypeReference<List<String>>() {})
                    : new ArrayList<>();

            // 게시글 수정 작업 진행 (이미지 삭제는 별도로 처리)
            Expense updatedExpense = expenseService.updateExpense(id, expenseDTO, images);

            // 이미지 삭제는 게시글 수정과 별개로 처리
            handleImageDeletion(deletedImages);

            ExpenseResponseDTO responseDTO = convertToResponseDTO(updatedExpense);
            return ResponseEntity.ok(responseDTO);

        } catch (JsonProcessingException e) {
            logger.error("Error parsing ExpenseRequestDTO: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            logger.error("Error updating expense: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    // 게시물 삭제 (id로)
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        try {
            // 게시글 조회
            Expense expense = expenseService.getExpense(id);
            if (expense == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            // 게시글에 연결된 이미지 삭제
            List<ExpenseImage> images = expenseImageRepository.findByExpenseId(id);
            for (ExpenseImage image : images) {
                try {
                    // 이미지 파일 삭제 시 application.properties에 설정된 경로를 사용하도록 수정
                    Path path = Paths.get(imageDirectory, image.getImageUrl().substring(image.getImageUrl().lastIndexOf("/") + 1));
                    Files.deleteIfExists(path);
                    expenseImageRepository.delete(image);
                    logger.info("Successfully deleted image: {}", image.getImageUrl());
                } catch (IOException e) {
                    logger.error("Failed to delete image file: {}", image.getImageUrl(), e);
                    throw new RuntimeException("Failed to delete image: " + image.getImageUrl(), e);
                }
            }

            // 게시글 삭제
            expenseService.deleteExpense(id);
            logger.info("Successfully deleted expense: {}", id);

            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting expense: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // 이미지 삭제 (id로)

    @DeleteMapping("/images/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long imageId) {
        try {
            expenseService.deleteImage(imageId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting image: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 이미지 삭제 처리 메서드 추가
    @Transactional
    private void handleImageDeletion(List<String> deletedImages) {
        if (deletedImages != null && !deletedImages.isEmpty()) {
            for (String imageUrl : deletedImages) {
                try {
                    expenseImageRepository.deleteByImageUrl(imageUrl);
                    // 이미지 파일 삭제 시 application.properties에 설정된 경로를 사용하도록 수정
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
    // Entity를 Response DTO로 변환하는 메서드
    private ExpenseResponseDTO convertToResponseDTO(Expense expense) {
        ExpenseResponseDTO responseDTO = new ExpenseResponseDTO();
        responseDTO.setId(expense.getId());
        responseDTO.setTitle(expense.getTitle());
        responseDTO.setContent(expense.getContent());
        responseDTO.setUsername(expense.getUsername());
        responseDTO.setAmount(expense.getAmount());
        responseDTO.setCategory(expense.getCategory());
        responseDTO.setExpenseDate(expense.getExpenseDate()); // 추가: 날짜 설정

        // 이미지 URLs 처리
        List<String> imageUrls = expenseImageRepository.findByExpenseId(expense.getId()).stream()
                .map(ExpenseImage::getImageUrl)
                .collect(Collectors.toList());
        responseDTO.setImageUrls(imageUrls);

        return responseDTO;
    }
}
