package Offime.Offime.service.attendance;

import Offime.Offime.dto.response.attendance.ResAttendanceHistoryForEmployeeDto;
import Offime.Offime.dto.response.attendance.ResAttendanceRecordDto;
import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.member.Member;
import Offime.Offime.repository.attendance.EventRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceManagerForEmployeeService {

    private final EventRecordRepository eventRecordRepository;

    public ResAttendanceHistoryForEmployeeDto getWeeklyAttendanceHistory(Member member, LocalDate date, int totalWorkdays) {
        List<EventRecord> records = getWeeklyRecords(member, date);
        return ResAttendanceHistoryForEmployeeDto.fromEntity(records, totalWorkdays);
    }

    public ResAttendanceHistoryForEmployeeDto getMonthlyAttendanceHistory(Member member, int year, int month, int totalWorkdays) {
        List<EventRecord> records = getMonthlyRecords(member, year, month);
        return ResAttendanceHistoryForEmployeeDto.fromEntity(records, totalWorkdays);
    }

    public ResAttendanceRecordDto getDailyAttendanceRecord(Member member, LocalDate date){
        List<EventRecord> records = getDailyRecords(member, date);
        return ResAttendanceRecordDto.fromEntity(records, date);
    }

    private List<EventRecord> getWeeklyRecords(Member member, LocalDate date) {
        LocalDate startOfWeek = date.with(java.time.DayOfWeek.MONDAY); // 주간 시작일 계산
        LocalDate endOfWeek = startOfWeek.plusDays(6); // 주간 종료일 계산
        return eventRecordRepository.findByMemberAndDateBetween(member, startOfWeek, endOfWeek);
    }

    private List<EventRecord> getMonthlyRecords(Member member, int year, int month) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);
        return eventRecordRepository.findByMemberAndDateBetween(member, startOfMonth, endOfMonth);
    }

    private List<EventRecord> getDailyRecords(Member member, LocalDate date) {
        return eventRecordRepository.findByMemberAndDate(member, date);
    }
}