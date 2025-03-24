package Offime.Offime.dto.reports.request;

import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.reports.TemplateAccess;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class TemplatesDto {

    private String title;
    private List<Long> accessMemberIdList;
    private Byte icon;
    private Byte color;
    private List<QuestionsDto> questionList;
}
