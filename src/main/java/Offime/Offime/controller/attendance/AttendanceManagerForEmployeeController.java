package Offime.Offime.controller.attendance;

import Offime.Offime.dto.request.attendance.ReqAttendanceDailyHistoryDto;
import Offime.Offime.dto.request.attendance.ReqAttendanceMonthlyHistoryDto;
import Offime.Offime.dto.request.attendance.ReqAttendanceWeeklyHistoryDto;
import Offime.Offime.dto.response.attendance.ResAttendanceHistoryForEmployeeDto;
import Offime.Offime.dto.response.attendance.ResAttendanceRecordDto;
import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.member.Member;
import Offime.Offime.service.attendance.AttendanceManagerForEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttendanceManagerForEmployeeController {

    private final AttendanceManagerForEmployeeService employeeAttendanceManagerService;

    @GetMapping("/weekly")
    public ResponseEntity<ResAttendanceHistoryForEmployeeDto> getWeeklyAttendance(
            @AuthenticationPrincipal Member member, @RequestParam LocalDate date) {
        ResAttendanceHistoryForEmployeeDto weeklyStats = employeeAttendanceManagerService.getWeeklyAttendanceHistory(
                member, date);
        return ResponseEntity.ok(weeklyStats);
    }


    @GetMapping("/monthly")
    public ResponseEntity<ResAttendanceHistoryForEmployeeDto> getMonthlyAttendance(
            @AuthenticationPrincipal Member member, @RequestBody ReqAttendanceMonthlyHistoryDto request) {
        ResAttendanceHistoryForEmployeeDto monthlyStats = employeeAttendanceManagerService.getMonthlyAttendanceHistory(
                member, request.getYear(), request.getMonth());
        return ResponseEntity.ok(monthlyStats);
    }

    @GetMapping("/daily")
    public ResponseEntity<ResAttendanceRecordDto> getDailyAttendanceRecord(
            @AuthenticationPrincipal Member member, @RequestBody ReqAttendanceDailyHistoryDto request) {
        ResAttendanceRecordDto records = employeeAttendanceManagerService.getDailyAttendanceRecord(
                member, request.getDate());
        return ResponseEntity.ok(records);
    }
}