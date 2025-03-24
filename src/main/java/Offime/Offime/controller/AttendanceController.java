package Offime.Offime.controller;


import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.service.attendanceService.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    @PostMapping("/clockIn")
    public ResponseEntity<String> clockIn(
//            @RequestParam(name = "memberId") Long memberId,
            @RequestParam(name = "latitude") double latitude,
            @RequestParam(name = "longitude") double longitude,
            @RequestParam(name = "eventType") EventRecord.EventType eventType) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.makeEvent(now, eventType, latitude, longitude);
            return ResponseEntity.ok("출근 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("출근 실패" + e.getMessage());
        }
    }

    @PostMapping("/returnToOffice")
    public ResponseEntity<String> returnToOffice(
//            @RequestParam(name = "memberId") Long memberId,
            @RequestParam(name = "latitude") double latitude,
            @RequestParam(name = "longitude") double longitude,
            @RequestParam(name = "eventType") EventRecord.EventType eventType) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.makeEvent(now, eventType, latitude, longitude);
            return ResponseEntity.ok("복귀 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("복귀 실패" + e.getMessage());
        }
    }

    @PostMapping("/clockOut")
    public ResponseEntity<String> clockOut(
//            @RequestParam(name = "memberId") Long memberId,
            @RequestParam(name = "eventType") EventRecord.EventType eventType) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.clockOut(now, eventType);
            return ResponseEntity.ok("퇴근 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("퇴근 실패" + e.getMessage());
        }
    }
}