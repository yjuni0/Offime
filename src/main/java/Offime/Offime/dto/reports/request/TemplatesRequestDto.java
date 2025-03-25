package Offime.Offime.dto.reports.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class TemplatesRequestDto {

    private String title;
    private List<Long> accessMemberIdList;
    private Byte icon;
    private Byte color;
    private List<QuestionsRequestDto> questionList;
}
