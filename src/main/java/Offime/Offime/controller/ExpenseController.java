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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;

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

    // 게시물 생성 (이미지와 함께)
// 게시물 생성 (이미지와 함께)
    @PostMapping
    public ResponseEntity<ExpenseResponseDTO> createExpense(@RequestParam("expenseDTO") String expenseDTOString,
                                                            @RequestParam("images") List<MultipartFile> images) {
        try {
            ExpenseRequestDTO expenseDTO = objectMapper.readValue(expenseDTOString, ExpenseRequestDTO.class);
            Expense createdExpense = expenseService.createExpense(expenseDTO, images);

            // 응답에 필요한 데이터 반환
            ExpenseResponseDTO responseDTO = new ExpenseResponseDTO();
            responseDTO.setId(createdExpense.getId());
            responseDTO.setTitle(createdExpense.getTitle());
            responseDTO.setContent(createdExpense.getContent());
            responseDTO.setAmount(createdExpense.getAmount());
            responseDTO.setCategory(createdExpense.getCategory());
            responseDTO.setCreatedAt(createdExpense.getCreatedAt());

            // 이미지 URLs 처리
            List<String> imageUrls = expenseImageRepository.findByExpenseId(createdExpense.getId()).stream()
                    .map(ExpenseImage::getImageUrl)
                    .collect(Collectors.toList());
            responseDTO.setImageUrls(imageUrls);

            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);

        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // JSON 파싱 오류 시 400 Bad Request 반환
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
    @PutMapping("/{id}")
    public ExpenseResponseDTO updateExpense(@PathVariable Long id, @RequestBody ExpenseRequestDTO expenseDTO) {
        Expense updatedExpense = expenseService.updateExpense(id, expenseDTO);
        return convertToResponseDTO(updatedExpense);
    }

    // 게시물 삭제 (id로)
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
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
        responseDTO.setCreatedAt(expense.getCreatedAt());

        // 이미지 URLs 처리
        List<String> imageUrls = expenseImageRepository.findByExpenseId(expense.getId()).stream()
                .map(ExpenseImage::getImageUrl)
                .collect(Collectors.toList());
        responseDTO.setImageUrls(imageUrls);

        return responseDTO;
    }
}
