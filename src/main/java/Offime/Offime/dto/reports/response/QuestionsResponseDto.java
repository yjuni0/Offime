package Offime.Offime.dto.reports.response;

import Offime.Offime.common.reports.QuestionType;
import Offime.Offime.entity.reports.Questions;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuestionsResponseDto {
    private Long id;
    private QuestionType type;
    private String questionText;
    private int order;

    @Builder
    public QuestionsResponseDto(Long id ,QuestionType type, String questionText, int order) {
        this.id = id;
        this.type = type;
        this.questionText = questionText;
        this.order = order;
    }

    public static QuestionsResponseDto fromEntity(Questions questions) {
        return QuestionsResponseDto.builder()
                .id(questions.getID())
                .questionText(questions.getQuestionText())
                .order(questions.getOrder())
                .type(questions.getType())
                .build();
    }
}
