package Offime.Offime.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

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
    private String createdAt;  // 작성시간

    @OneToMany(mappedBy = "expense", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExpenseImage> images;  // 여러 개의 사진

    // 기본 생성자, 모든 필드를 받는 생성자가 자동 생성됩니다.
}
