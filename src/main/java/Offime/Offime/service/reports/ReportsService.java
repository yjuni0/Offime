package Offime.Offime.service.reports;

import Offime.Offime.dto.reports.request.ReportsRequestDto;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.reports.Reports;
import Offime.Offime.entity.reports.Responses;
import Offime.Offime.entity.reports.Templates;
import Offime.Offime.repository.member.MemberRepository;
import Offime.Offime.repository.reports.ReportsRepository;
import Offime.Offime.repository.reports.ResponsesRepository;
import Offime.Offime.repository.reports.TemplatesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ReportsService {

    private final TemplatesRepository templatesRepository;
    private final MemberRepository memberRepository;
    private final ReportsRepository reportsRepository;
    private final ResponsesRepository responsesRepository;

    public void createReport(ReportsRequestDto reportsRequestDto) {

        Reports reports = new Reports();
        reports.setTitle(reportsRequestDto.getTitle());

        Member writer = memberRepository.findById(reportsRequestDto.getWriterId()).orElseThrow(() -> new NoSuchElementException());

        reports.setWriter(writer);

        Templates templates = templatesRepository.findById(reportsRequestDto.getTemplateId()).orElseThrow(() -> new NoSuchElementException());

        reports.setTemplate(templates);

        reportsRepository.save(reports);

//        Responses responses = new Responses();
//        responses.setReport(reports);
//        responses.setQuestion();
//
//        responsesRepository.save(responses);

    }
}
