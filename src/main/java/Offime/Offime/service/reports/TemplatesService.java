package Offime.Offime.service.reports;

import Offime.Offime.dto.reports.request.QuestionsDto;
import Offime.Offime.dto.reports.request.TemplatesDto;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.reports.Questions;
import Offime.Offime.entity.reports.TemplateAccess;
import Offime.Offime.entity.reports.Templates;
import Offime.Offime.repository.member.MemberRepository;
import Offime.Offime.repository.reports.QuestionsRepository;
import Offime.Offime.repository.reports.TemplatesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TemplatesService {

    private final TemplatesRepository templatesRepository;
    private final MemberRepository memberRepository;
    private final QuestionsRepository questionsRepository;

    public void createTemplate(TemplatesDto templatesDto) {

        Templates template = new Templates();
        template.setTitle(templatesDto.getTitle());
        template.setColor(templatesDto.getColor());
        template.setIcon(templatesDto.getIcon());

        List<TemplateAccess> accessList = new ArrayList<>();

        for (Long memberId : templatesDto.getAccessMemberIdList()) {
            Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다 : " + memberId));

            TemplateAccess templateAccess = new TemplateAccess();
            templateAccess.setMember(member);
            templateAccess.setTemplate(template);

            accessList.add(templateAccess);
        }



        template.setAccessList(accessList);

        templatesRepository.save(template);

        createQuestions(template, templatesDto.getQuestionList());
    }

    private void createQuestions(Templates template, List<QuestionsDto> questionList) {

        for (QuestionsDto questionData : questionList) {
            Questions question = new Questions();
            question.setType(questionData.getType());
            question.setQuestionText(questionData.getContent());
            question.setTemplate(template);

            questionsRepository.save(question);
        }
    }


}
