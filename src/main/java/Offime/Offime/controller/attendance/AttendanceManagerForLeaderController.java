package Offime.Offime.controller.attendance;

import Offime.Offime.dto.response.attendance.ResAttendanceHistoryForLeaderDto;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.member.Team;
import Offime.Offime.service.attendance.AttendanceManagerForLeaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
public class AttendanceManagerForLeaderController {

    private final AttendanceManagerForLeaderService attendanceManagerForLeaderService;

    @GetMapping("/forAll")
    public ResponseEntity<ResAttendanceHistoryForLeaderDto> getDailyAttendanceForAll(
            @AuthenticationPrincipal Member member,
            @RequestParam LocalDate date) {
        ResAttendanceHistoryForLeaderDto statsForAll = attendanceManagerForLeaderService.getDailyAttendanceForAll(
                member, date);
        return ResponseEntity.ok(statsForAll);
    }

    @GetMapping("/forTeam")
    public ResponseEntity<ResAttendanceHistoryForLeaderDto> getDailyAttendanceForTeam(
            @AuthenticationPrincipal Member member,
            @RequestParam LocalDate date,
            @RequestParam Team team) {
        ResAttendanceHistoryForLeaderDto statsForTeam = attendanceManagerForLeaderService.getDailyAttendanceForTeam(
                member, date, team);
        return ResponseEntity.ok(statsForTeam);
    }
}