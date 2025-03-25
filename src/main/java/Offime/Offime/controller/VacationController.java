package Offime.Offime.controller;

import Offime.Offime.entity.Member;
import Offime.Offime.service.VacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/vacation")
@RequestMapping
@RequiredArgsConstructor
public class VacationController {
    private final VacationService vacationService;

    @GetMapping
    public ResponseEntity<?> getAll(Member member, Pageable pageable) {
        vacationService.getAllVacations(member,pageable);
        return ResponseEntity.ok().body(vacationService.getAllVacations(member,pageable));
    }

    @GetMapping("/{vacationId}")
    public ResponseEntity<?> getVacationById(Member member,@PathVariable Long vacationId) {
        vacationService.getVacationById(member,vacationId);
        return ResponseEntity.ok().body(vacationService.getVacationById(member,vacationId));
    }
}
