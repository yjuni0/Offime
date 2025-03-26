package Offime.Offime.dto.reports.request;

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
