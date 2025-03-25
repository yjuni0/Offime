package Offime.Offime.service.reports;

import Offime.Offime.dto.reports.request.QuestionsRequestDto;
import Offime.Offime.dto.reports.request.TemplatesRequestDto;
import Offime.Offime.dto.reports.response.QuestionsResponseDto;
import Offime.Offime.dto.reports.response.TemplatesResponseDto;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.reports.Options;
import Offime.Offime.entity.reports.Questions;
import Offime.Offime.entity.reports.TemplateAccess;
import Offime.Offime.entity.reports.Templates;
import Offime.Offime.repository.member.MemberRepository;
import Offime.Offime.repository.reports.OptionsRepository;
import Offime.Offime.repository.reports.QuestionsRepository;
import Offime.Offime.repository.reports.TemplatesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TemplatesService {

    private final TemplatesRepository templatesRepository;
    private final MemberRepository memberRepository;
    private final QuestionsRepository questionsRepository;
    private final OptionsRepository optionsRepository;

    // 템플릿 만들기

    public void createTemplate(TemplatesRequestDto templatesRequestDto) {

        Templates template = new Templates();
        template.setTitle(templatesRequestDto.getTitle());
        template.setColor(templatesRequestDto.getColor());
        template.setIcon(templatesRequestDto.getIcon());

        List<TemplateAccess> accessList = new ArrayList<>();

        for (Long memberId : templatesRequestDto.getAccessMemberIdList()) {
            Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다 : " + memberId));

            TemplateAccess templateAccess = new TemplateAccess();
            templateAccess.setMember(member);
            templateAccess.setTemplate(template);

            accessList.add(templateAccess);
        }



        template.setAccessList(accessList);

        templatesRepository.save(template);

        createQuestions(template, templatesRequestDto.getQuestionList());
    }

    private void createQuestions(Templates template, List<QuestionsRequestDto> questionList) {

        for (QuestionsRequestDto questionData : questionList) {
            Questions question = new Questions();
            question.setOrder(questionData.getOrder());
            question.setType(questionData.getType());
            question.setQuestionText(questionData.getContent());
            question.setTemplate(template);

            questionsRepository.save(question);

            createOptions(question, questionData.getOptionList());
        }
    }

    private void createOptions(Questions question, List<String> optionList) {

        for (String option : optionList) {
            Options options = new Options();
            options.setOptionText(option);
            options.setQuestion(question);

            optionsRepository.save(options);
        }
    }

    public List<TemplatesResponseDto> getAllTemplates() {
        return templatesRepository.findAll().stream().map(TemplatesResponseDto::fromEntity).toList();
    }

    public TemplatesResponseDto getTemplate(Long templateId) {
        return templatesRepository.findById(templateId).map(TemplatesResponseDto::fromEntity).orElseThrow(() -> new NoSuchElementException());
    }

    public List<QuestionsResponseDto> getQuestions(Long templateId) {
        return questionsRepository.getAllByTemplateId(templateId).stream().map(QuestionsResponseDto::fromEntity).toList();
    }

    public List<String> getOptions(Long questionId) {
        return optionsRepository.getAllOptionTextByQuestionId(questionId);
    }

}
