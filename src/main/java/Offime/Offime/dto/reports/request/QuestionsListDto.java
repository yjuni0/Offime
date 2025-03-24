package Offime.Offime.dto.reports.request;

import Offime.Offime.common.reports.QuestionType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuestionsListDto {

    private QuestionType type;
    private String questionText;
}
