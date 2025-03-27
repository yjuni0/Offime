package Offime.Offime.dto.request.reports;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResponsesReqDto {
    private Long questionId;
    private String answerText;
}
