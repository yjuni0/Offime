package Offime.Offime.dto.reports.request;

import Offime.Offime.common.reports.QuestionType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class QuestionsDto {
    private QuestionType type;
    private String content;
    private List<String> optionList;
}
