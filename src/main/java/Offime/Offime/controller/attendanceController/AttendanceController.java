package Offime.Offime.controller.attendanceController;

import Offime.Offime.dto.attendanceDto.request.ReqClockInDto;
import Offime.Offime.dto.attendanceDto.request.ReqClockOutDto;
import Offime.Offime.dto.attendanceDto.request.ReqOutOfOfficeDto;
import Offime.Offime.dto.attendanceDto.request.ReqReturnToOfficeDto;
import Offime.Offime.service.attendanceService.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/clockIn")
    public ResponseEntity<String> clockIn(
//            @RequestParam(name = "memberId") Long memberId,
            @RequestBody ReqClockInDto dto) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.clockIn(dto,now);
            return ResponseEntity.ok("출근 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("출근 실패" + e.getMessage());
        }
    }

    @PostMapping("/outOfOffice")
    public ResponseEntity<String> outOfOffice(
//            @RequestParam(name = "memberId") Long memberId,
            @RequestBody ReqOutOfOfficeDto dto) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.outOfOffice(dto, now);
            return ResponseEntity.ok("자리비움 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("자리비움 실패" + e.getMessage());
        }
    }

    @PostMapping("/returnToOffice")
    public ResponseEntity<String> returnToOffice(
//            @RequestParam(name = "memberId") Long memberId,
            @RequestBody ReqReturnToOfficeDto dto) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.returnToOffice(dto, now);
            return ResponseEntity.ok("복귀 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("복귀 실패" + e.getMessage());
        }
    }

    @PostMapping("/clockOut")
    public ResponseEntity<String> clockOut(
//            @RequestParam(name = "memberId") Long memberId,
            @RequestBody ReqClockOutDto dto) {
        LocalDateTime now = LocalDateTime.now();
        try {
            attendanceService.clockOut(dto, now);
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