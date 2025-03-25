package Offime.Offime.controller.reports;

import Offime.Offime.dto.reports.request.TemplatesRequestDto;
import Offime.Offime.service.reports.TemplatesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/templates")
@RequiredArgsConstructor
public class TemplatesController {

    private final TemplatesService templatesService;

    @PostMapping("/create")
    public ResponseEntity<String> createTemplate(@RequestBody TemplatesRequestDto templatesRequestDto) {
        System.out.println(templatesRequestDto);
        templatesService.createTemplate(templatesRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body("템플릿 생성 완료");
    }


}
