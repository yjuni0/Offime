package Offime.Offime.dto.response.expense;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ExpenseResponseDTO {

    private Long id;
    private String title;
    private String content;
    private String username;
    private double amount;
    private String category;
    private LocalDate expenseDate;
    private List<String> imageUrls;  // 이미지는 URL로 응답


}
