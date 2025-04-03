package Offime.Offime.controller.attendance;

import Offime.Offime.dto.response.attendance.ResAttendanceHistoryForEmployeeDto;
import Offime.Offime.dto.response.attendance.ResAttendanceRecordDto;
import Offime.Offime.entity.member.Member;
import Offime.Offime.service.attendance.AttendanceManagerForEmployeeService;
import Offime.Offime.service.attendance.WorkingDaysService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttendanceManagerForEmployeeController {

    private final AttendanceManagerForEmployeeService employeeAttendanceManagerService;
    private final WorkingDaysService workingDaysService;

    @GetMapping("/weekly")
    public ResponseEntity<ResAttendanceHistoryForEmployeeDto> getWeeklyAttendance(
            @AuthenticationPrincipal Member member,
            @RequestParam LocalDate date) {
        int totalWorkdays = 0;
        ResAttendanceHistoryForEmployeeDto weeklyStats = employeeAttendanceManagerService.getWeeklyAttendanceHistory(
                member, date, totalWorkdays);
        return ResponseEntity.ok(weeklyStats);
    }

    @GetMapping("/monthly")
    public ResponseEntity<ResAttendanceHistoryForEmployeeDto> getMonthlyAttendance(
            @AuthenticationPrincipal Member member,
            @RequestParam int year,
            @RequestParam int month) {
        int totalWorkdays = 0;
        ResAttendanceHistoryForEmployeeDto monthlyStats = employeeAttendanceManagerService.getMonthlyAttendanceHistory(
                member, year, month, totalWorkdays);
        return ResponseEntity.ok(monthlyStats);
    }

    @GetMapping("/daily")
    public ResponseEntity<ResAttendanceRecordDto> getDailyAttendanceRecord(
            @AuthenticationPrincipal Member member,
            @RequestParam LocalDate date) {
        ResAttendanceRecordDto records = employeeAttendanceManagerService.getDailyAttendanceRecord(
                member, date);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/week")
    public ResponseEntity<Integer> getWorkingDaysForWeek(@RequestParam String date) {
        int workingDays = workingDaysService.calculateWorkingDaysForWeek(date);
        return ResponseEntity.ok(workingDays);
    }

    @GetMapping("/month")
    public ResponseEntity<Integer> getWorkingDaysForMonth(@RequestParam String date) {
        int workingDays = workingDaysService.calculateWorkingDaysForMonth(date);
        return ResponseEntity.ok(workingDays);
    }
}