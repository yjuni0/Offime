package Offime.Offime.service;

import Offime.Offime.ExpenseNotFoundException;
import Offime.Offime.controller.ExpenseController;
import Offime.Offime.dto.request.ExpenseRequestDTO;
import Offime.Offime.dto.response.ExpenseResponseDTO;
import Offime.Offime.entity.Expense;
import Offime.Offime.entity.ExpenseImage;
import Offime.Offime.repository.ExpenseImageRepository;
import Offime.Offime.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private ExpenseImageRepository expenseImageRepository;

    @Value("${file.upload.path}")
    private String uploadDir;

    private static final Logger logger = LoggerFactory.getLogger(ExpenseController.class);

    // 게시물 생성 (이미지와 함께)
    public Expense createExpense(ExpenseRequestDTO expenseDTO, List<MultipartFile> images) {
        Expense expense = new Expense();
        expense.setTitle(expenseDTO.getTitle());
        expense.setContent(expenseDTO.getContent());
        expense.setAmount(expenseDTO.getAmount());
        expense.setCategory(expenseDTO.getCategory());

        // 사용자가 선택한 날짜 처리
        LocalDate expenseDate = expenseDTO.getExpenseDate();
        if (expenseDate != null) {
            expense.setExpenseDate(expenseDate);
        }

        // 현재 인증된 사용자의 username을 가져와 작성자로 설정
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        expense.setUsername(username);

        // Expense 저장
        Expense savedExpense = expenseRepository.save(expense);

        // 이미지가 있을 경우에만 이미지 처리
        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                String imageUrl = saveImage(image);  // 이미지 파일 저장 후 URL 얻기
                ExpenseImage expenseImage = new ExpenseImage();
                expenseImage.setImageUrl(imageUrl);
                expenseImage.setExpense(savedExpense);
                expenseImageRepository.save(expenseImage);
            }
        }

        return savedExpense;
    }

    // 이미지 파일을 저장하는 메서드
    private String saveImage(MultipartFile image) {
        try {
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                if (!uploadDirFile.mkdirs()) {
                    logger.error("이미지 업로드 디렉토리 생성 실패: {}", uploadDir);
                    throw new RuntimeException("이미지 업로드 디렉토리 생성 실패");
                }
            }
            String fileName = System.currentTimeMillis() + "-" + image.getOriginalFilename();
            File uploadFile = new File(uploadDir, fileName);
            image.transferTo(uploadFile);

            // 이미지 URL을 반환 (절대 경로 사용)
            String serverUrl;
            if (System.getenv("ENV") != null && System.getenv("ENV").equals("production")) {
                serverUrl = "http://localhost:8080";
            } else {
                serverUrl = "http://localhost:3000";
            } // 실제 백엔드 서버 주소와 포트로 변경
            return serverUrl + "/images/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Image upload failed: " + e.getMessage());
        }
    }

    // 게시물 조회 (작성자만 조회 가능)
    public Expense getExpense(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found with id: " + id));

        // 현재 인증된 사용자의 username 가져오기
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        // 게시물 작성자와 현재 사용자가 다르면 권한 없음 예외 발생 (또는 다른 처리)
        if (!expense.getUsername().equals(currentUsername)) {
            throw new org.springframework.security.access.AccessDeniedException("You do not have permission to access this expense.");
        }

        return expense;
    }

    // 게시물 목록 조회 (현재 사용자 기준, 관리자는 전체 조회)
    public List<Expense> getExpenses() {
        // 현재 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 관리자 권한 확인
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN")); // 'ROLE_ADMIN'은 실제 관리자 역할 이름으로 변경해야 합니다.

        if (isAdmin) {
            // 관리자는 모든 게시물 조회
            return expenseRepository.findAll();
        } else {
            // 일반 사용자는 자신의 게시물만 조회
            String currentUsername = authentication.getName();
            return expenseRepository.findByUsername(currentUsername);
        }
    }

    private ExpenseResponseDTO convertToResponseDTO(Expense expense) {
        ExpenseResponseDTO responseDTO = new ExpenseResponseDTO();
        responseDTO.setId(expense.getId());
        responseDTO.setTitle(expense.getTitle());
        responseDTO.setContent(expense.getContent());
        responseDTO.setUsername(expense.getUsername()); // 변경됨
        responseDTO.setAmount(expense.getAmount());
        responseDTO.setCategory(expense.getCategory());

        List<String> imageUrls = expenseImageRepository.findByExpenseId(expense.getId()).stream()
                .map(ExpenseImage::getImageUrl)
                .collect(Collectors.toList());
        responseDTO.setImageUrls(imageUrls);

        return responseDTO;
    }

    @Transactional
    public Expense updateExpense(Long id, ExpenseRequestDTO expenseDTO, List<MultipartFile> images) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found with id: " + id));

        // 게시물 수정 (권한 확인 없이 모든 사용자가 수정 가능)
        expense.setTitle(expenseDTO.getTitle());
        expense.setContent(expenseDTO.getContent());
        expense.setAmount(expenseDTO.getAmount());
        expense.setCategory(expenseDTO.getCategory());
        expense.setExpenseDate(expenseDTO.getExpenseDate());

        // 이미지가 있을 경우 처리
        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                String imageUrl = saveImage(image);
                ExpenseImage expenseImage = new ExpenseImage();
                expenseImage.setImageUrl(imageUrl);
                expenseImage.setExpense(expense);
                expenseImageRepository.save(expenseImage);
            }
        }

        return expenseRepository.save(expense);
    }

    @Transactional
    public void deleteExpense(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found with id: " + id));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ADMIN")); // 'ROLE_ADMIN'로 권한 확인

        // 관리자가 아니면 삭제 권한 없음
        if (!isAdmin) {
            throw new org.springframework.security.access.AccessDeniedException("Only administrators have permission to delete expenses.");
        }

        expenseRepository.delete(expense);
    }
}
