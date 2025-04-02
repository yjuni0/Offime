package Offime.Offime.service.attendance;

import Offime.Offime.dto.response.attendance.ResAttendanceHistoryForEmployeeDto;
import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.member.Member;
import Offime.Offime.repository.attendance.EventRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceManagerForEmployeeService {

    private final EventRecordRepository eventRecordRepository;

    public ResAttendanceHistoryForEmployeeDto getWeeklyAttendanceHistory(Member member, int year, int month, int startDay) {
        List<EventRecord> records = getWeeklyRecords(member, year, month, startDay);
        return ResAttendanceHistoryForEmployeeDto.fromEntity(records);
    }

    public ResAttendanceHistoryForEmployeeDto getMonthlyAttendanceHistory(Member member, int year, int month) {
        List<EventRecord> records = getMonthlyRecords(member, year, month);
        return ResAttendanceHistoryForEmployeeDto.fromEntity(records);
    }

    private List<EventRecord> getWeeklyRecords(Member member, int year, int month, int startDay) {
        LocalDate startOfWeek = LocalDate.of(year, month, startDay);
        LocalDate endOfWeek = startOfWeek.plusDays(6);
        return eventRecordRepository.findByMemberAndDateBetween(member, startOfWeek, endOfWeek);
    }

    private List<EventRecord> getMonthlyRecords(Member member, int year, int month) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);
        return eventRecordRepository.findByMemberAndDateBetween(member, startOfMonth, endOfMonth);
    }
}