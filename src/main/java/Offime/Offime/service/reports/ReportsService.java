package Offime.Offime.service.reports;

import Offime.Offime.dto.reports.request.ReportsRequestDto;
import Offime.Offime.dto.reports.request.ReportsResponseRequestDto;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.reports.Questions;
import Offime.Offime.entity.reports.Reports;
import Offime.Offime.entity.reports.Responses;
import Offime.Offime.entity.reports.Templates;
import Offime.Offime.repository.member.MemberRepository;
import Offime.Offime.repository.reports.QuestionsRepository;
import Offime.Offime.repository.reports.ReportsRepository;
import Offime.Offime.repository.reports.ResponsesRepository;
import Offime.Offime.repository.reports.TemplatesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ReportsService {

    private final TemplatesRepository templatesRepository;
    private final MemberRepository memberRepository;
    private final ReportsRepository reportsRepository;
    private final ResponsesRepository responsesRepository;
    private final QuestionsRepository questionsRepository;

    public void createReport(ReportsRequestDto reportsRequestDto) {

        Reports reports = new Reports();
        reports.setTitle(reportsRequestDto.getTitle());

        Member writer = memberRepository.findById(reportsRequestDto.getWriterId()).orElseThrow(() -> new NoSuchElementException());

        reports.setWriter(writer);

        Templates templates = templatesRepository.findById(reportsRequestDto.getTemplateId()).orElseThrow(() -> new NoSuchElementException());

        reports.setTemplate(templates);

        reportsRepository.save(reports);

        saveResponse(reports, reportsRequestDto.getResponseData());
    }

    private void saveResponse(Reports reports, List<ReportsResponseRequestDto> responseDataList) {

        for (ReportsResponseRequestDto responseData : responseDataList) {

            Responses responses = new Responses();
            responses.setReport(reports);
            responses.setAnswerText(responseData.getAnswerText());

            Questions question = questionsRepository.findById(responseData.getQuestionId()).orElseThrow(() -> new NoSuchElementException());

            responses.setQuestion(question);

            responsesRepository.save(responses);
        }
    }
}
