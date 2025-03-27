package Offime.Offime.controller.attendance;

import Offime.Offime.dto.response.attendance.ResAttendanceHistoryDto;
import Offime.Offime.dto.request.attendance.ReqAttendanceMonthlyHistoryDto;
import Offime.Offime.dto.request.attendance.ReqAttendanceWeeklyHistoryDto;
import Offime.Offime.service.attendance.EmployeeAttendanceManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AttendanceHistoryController {

    private final EmployeeAttendanceManagerService employeeAttendanceManagerService;

    @GetMapping("/weekly")
    public ResponseEntity<ResAttendanceHistoryDto> getWeeklyAttendance(
            @RequestBody ReqAttendanceWeeklyHistoryDto request) {
        ResAttendanceHistoryDto weeklyStats = employeeAttendanceManagerService.getWeeklyAttendanceHistory(
                request.getYear(), request.getMonth(), request.getStartDay());
        return ResponseEntity.ok(weeklyStats);
    }

    @GetMapping("/monthly")
    public ResponseEntity<ResAttendanceHistoryDto> getMonthlyAttendance(
            @RequestBody ReqAttendanceMonthlyHistoryDto request) {
        ResAttendanceHistoryDto monthlyStats = employeeAttendanceManagerService.getMonthlyAttendanceHistory(
                request.getYear(), request.getMonth());
        return ResponseEntity.ok(monthlyStats);
    }
}
