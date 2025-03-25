package Offime.Offime.controller;

import Offime.Offime.dto.request.ExpenseRequestDTO;
import Offime.Offime.dto.response.ExpenseResponseDTO;
import Offime.Offime.entity.Expense;
import Offime.Offime.entity.ExpenseImage;
import Offime.Offime.repository.ExpenseImageRepository;
import Offime.Offime.service.ExpenseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


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

    private static final Logger logger = LoggerFactory.getLogger(ExpenseController.class);


    // 게시물 생성 (이미지와 함께)
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
    public ResponseEntity<ExpenseResponseDTO> updateExpense(
            @PathVariable Long id,
            @RequestPart("expenseDTO") ExpenseRequestDTO expenseDTO,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {

        try {
            // 권한 검사
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 인증되지 않은 사용자
            }

            String currentUsername = authentication.getName(); // 현재 사용자 이름
            Expense expense = expenseService.getExpense(id);
            if (!expense.getUsername().equals(currentUsername)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 권한 없음
            }

            Expense updatedExpense = expenseService.updateExpense(id, expenseDTO, images);
            ExpenseResponseDTO responseDTO = convertToResponseDTO(updatedExpense);
            return ResponseEntity.ok(responseDTO);

        } catch (Exception e) {
            logger.error("Error updating expense: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 게시물 삭제 (id로)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build(); // HTTP 204 No Content 반환
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
