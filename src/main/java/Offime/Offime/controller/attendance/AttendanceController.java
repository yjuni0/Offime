package Offime.Offime.controller.attendance;

import Offime.Offime.dto.request.attendance.ReqClockInDto;
import Offime.Offime.dto.request.attendance.ReqClockOutDto;
import Offime.Offime.dto.request.attendance.ReqOutOfOfficeDto;
import Offime.Offime.dto.request.attendance.ReqReturnToOfficeDto;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.member.WorkStatus;
import Offime.Offime.service.attendance.AttendanceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/workStatus")
    public ResponseEntity<WorkStatus> getWorkStatus(@AuthenticationPrincipal Member member) {
        log.info("워크스테이터스 : " + member.getWorkStatus());
        return ResponseEntity.ok(member.getWorkStatus());
    }

    @PostMapping("/clockIn")
    public ResponseEntity<String> clockIn(
            @AuthenticationPrincipal Member member, @RequestBody ReqClockInDto dto) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.clockIn(member, dto, now);
            return ResponseEntity.ok("출근 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("출근 실패" + e.getMessage());
        }
    }

    @PostMapping("/outOfOffice")
    public ResponseEntity<String> outOfOffice(
            @AuthenticationPrincipal Member member, @RequestBody ReqOutOfOfficeDto dto) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.outOfOffice(member, dto, now);
            return ResponseEntity.ok("자리비움 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("자리비움 실패" + e.getMessage());
        }
    }

    @PostMapping("/returnToOffice")
    public ResponseEntity<String> returnToOffice(
            @AuthenticationPrincipal Member member, @RequestBody ReqReturnToOfficeDto dto) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.returnToOffice(member, dto, now);
            return ResponseEntity.ok("복귀 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("복귀 실패" + e.getMessage());
        }
    }

    @PostMapping("/clockOut")
    public ResponseEntity<String> clockOut(
            @AuthenticationPrincipal Member member, @RequestBody ReqClockOutDto dto) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.clockOut(member, dto, now);
            return ResponseEntity.ok("퇴근 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("퇴근 실패" + e.getMessage());
        }
    }
//    @GetMapping("/time")
//    public ResponseEntity<List<Long>> getTimeDifference(
//            @RequestParam(name = "localDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate localDate) {
//        List<Long> timeDifference = attendanceService.getTimeDifference(localDate);
//        return ResponseEntity.ok(timeDifference);
//    }
}