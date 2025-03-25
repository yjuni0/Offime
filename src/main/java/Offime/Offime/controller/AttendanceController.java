package Offime.Offime.controller;

import Offime.Offime.dto.attendanceDto.request.RequestClockIn;
import Offime.Offime.dto.attendanceDto.request.RequestReturnToOffice;
import Offime.Offime.service.attendanceService.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/clockIn")
    public ResponseEntity<String> clockIn(
//            @RequestParam(name = "memberId") Long memberId,
            @RequestBody RequestClockIn dto) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.clockIn(dto,now);
            return ResponseEntity.ok("출근 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("출근 실패" + e.getMessage());
        }
    }

    @PostMapping("/returnToOffice")
    public ResponseEntity<String> returnToOffice(
//            @RequestParam(name = "memberId") Long memberId,
            @RequestBody RequestReturnToOffice dto) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.returnToOffice(dto, now);
            return ResponseEntity.ok("복귀 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("복귀 실패" + e.getMessage());
        }
    }
//
//
//    @PostMapping("/outOfOffice")
//    public ResponseEntity<String> outOfOffice(
////            @RequestParam(name = "memberId") Long memberId,
//            @RequestParam(name = "eventType") EventRecord.EventType eventType,
//            @RequestParam(name = "outOfOfficeType") EventRecord.OutOfOfficeType outOfOfficeType) {
//        LocalDateTime now = LocalDateTime.now();
//        try {
//            attendanceService.OutOfOffice(now, eventType, outOfOfficeType);
//            return ResponseEntity.ok("자리비움 성공 - 사유 : " +  outOfOfficeType);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body("자리비움 실패" + e.getMessage());
//        }
//    }
//
//    @PostMapping("/clockOut")
//    public ResponseEntity<String> clockOut(
////            @RequestParam(name = "memberId") Long memberId,
//            @RequestParam(name = "eventType") EventRecord.EventType eventType) {
//        LocalDateTime now = LocalDateTime.now();
//        try {
//            attendanceService.clockOut(now, eventType);
//            return ResponseEntity.ok("퇴근 성공");
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body("퇴근 실패" + e.getMessage());
//        }
//    }

    @GetMapping("/time")
    public ResponseEntity<List<Long>> getTimeDifference(
            @RequestParam(name = "localDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate localDate) {
        List<Long> timeDifference = attendanceService.getTimeDifference(localDate);
        return ResponseEntity.ok(timeDifference);
    }

}