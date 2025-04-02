package Offime.Offime.entity.expense;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor  // 기본 생성자 추가
@AllArgsConstructor // 모든 필드를 받는 생성자 추가
@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;  // 비용 제목
    private String content;  // 내용
    private String username;  // 작성자
    private double amount;  // 금액
    private String category;  // 식비, 교통, 숙박, 경조사, 기타

    @Enumerated(EnumType.STRING)
    private ExpenseStatus status;

    @Column(name = "expense_date", nullable = false)
    private LocalDate expenseDate;

    @OneToMany(mappedBy = "expense", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = false) // 수정된 부분
    private List<ExpenseImage> images;  // 여러 개의 사진

    // 기본 생성자, 모든 필드를 받는 생성자가 자동 생성됩니다.
}
