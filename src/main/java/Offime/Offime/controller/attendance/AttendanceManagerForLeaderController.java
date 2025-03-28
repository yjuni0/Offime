//package Offime.Offime.controller.attendance;
//
//import Offime.Offime.dto.request.attendance.ReqAttendanceDailyHistoryDto;
//import Offime.Offime.dto.request.attendance.ReqAttendanceMonthlyHistoryDto;
//import Offime.Offime.dto.request.attendance.ReqAttendanceWeeklyHistoryDto;
//import Offime.Offime.dto.response.attendance.ResAttendanceHistoryForEmployeeDto;
//import Offime.Offime.dto.response.attendance.ResAttendanceHistoryForLeaderDto;
//import Offime.Offime.entity.member.Member;
//import Offime.Offime.service.attendance.AttendanceManagerForLeaderService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//public class AttendanceManagerForLeaderController {
//
//    private final AttendanceManagerForLeaderService attendanceManagerForLeaderService;
//
//    @GetMapping("/forAll")
//    public ResponseEntity<ResAttendanceHistoryForLeaderDto> getDailyAttendanceForAll(
//            @AuthenticationPrincipal Member member, @RequestBody ReqAttendanceDailyHistoryDto request) {
//        ResAttendanceHistoryForLeaderDto statsForAll = attendanceManagerForLeaderService.getDailyAttendanceHistoryForAll(
//                member, request.getDate());
//        return ResponseEntity.ok(statsForAll);
//    }
//}