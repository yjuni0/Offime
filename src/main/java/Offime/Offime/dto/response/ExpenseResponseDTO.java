package Offime.Offime.dto.response;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

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
    private String createdAt;
    private List<String> imageUrls;  // 이미지는 URL로 응답


}
