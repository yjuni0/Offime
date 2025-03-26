package Offime.Offime.dto.reports.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class TemplatesReqDto {

    private String title;
    private List<Long> accessMemberIdList;
    private Byte icon;
    private Byte color;
    private List<QuestionsReqDto> questionList;
}
