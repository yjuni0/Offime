package Offime.Offime.controller.attendance;

import Offime.Offime.dto.request.attendance.HolidayRequestDto;
import Offime.Offime.dto.response.attendance.HolidayResponseDto;
import Offime.Offime.dto.response.attendance.WeekdayResponseDto;
import Offime.Offime.service.attendance.AttendanceManagerForEmployeeService;
import Offime.Offime.service.attendance.HolidayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class HolidayController {

    private final HolidayService holidayService;
    private final AttendanceManagerForEmployeeService attendanceManagerForEmployeeService;

    @PostMapping("/list")
    public ResponseEntity<HolidayResponseDto> getHolidays(@RequestBody HolidayRequestDto requestDto) {
        return ResponseEntity.ok(holidayService.getHolidays(requestDto));
    }

    @PostMapping("/weekdays")
    public ResponseEntity<WeekdayResponseDto> getWeekdays(@RequestBody HolidayRequestDto requestDto) {
        return ResponseEntity.ok(holidayService.getWeekdays(requestDto));
    }
}