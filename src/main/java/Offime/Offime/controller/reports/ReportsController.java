package Offime.Offime.controller.reports;

import Offime.Offime.dto.reports.request.ReportsRequestDto;
import Offime.Offime.dto.reports.response.QuestionsResponseDto;
import Offime.Offime.dto.reports.response.TemplatesResponseDto;
import Offime.Offime.entity.reports.Templates;
import Offime.Offime.service.reports.ReportsService;
import Offime.Offime.service.reports.TemplatesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportsController {

    private final TemplatesService templatesService;
    private final ReportsService reportsService;

    @GetMapping("/templateSelectList")
    public ResponseEntity<List<TemplatesResponseDto>> templateSelectList() {
        return ResponseEntity.status(200).body(templatesService.getAllTemplates());
    }

    @GetMapping("/template/{templateId}")
    public ResponseEntity<TemplatesResponseDto> getTemplate(@PathVariable("templateId") Long templateId) {
        return ResponseEntity.status(200).body(templatesService.getTemplate(templateId));
    }

    @GetMapping("/template/{templateId}/questions")
    public ResponseEntity<List<QuestionsResponseDto>> getQuestions(@PathVariable("templateId") Long templateId) {
        return ResponseEntity.status(200).body(templatesService.getQuestions(templateId));
    }

    @GetMapping("/template/questions/{questionId}")
    public ResponseEntity<List<String>> getOptions(@PathVariable("questionId") Long questionId) {
        return ResponseEntity.status(200).body(templatesService.getOptions(questionId));
    }

    @PostMapping("/create")
    public ResponseEntity<String> createReport (@RequestBody ReportsRequestDto reportsRequestDto) {
        reportsService.createReport(reportsRequestDto);
        return ResponseEntity.status(200).body("success");
    }
}
