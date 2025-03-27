package Offime.Offime.service.attendance;

import Offime.Offime.dto.response.attendance.ResAttendanceHistoryDto;
import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.repository.attendance.EventRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeAttendanceManagerService {

    private final EventRecordRepository eventRecordRepository;

    public ResAttendanceHistoryDto getWeeklyAttendanceHistory(Long memberId, int year, int month, int startDay) {
        List<EventRecord> records = getWeeklyRecords(memberId, year, month, startDay);
        return ResAttendanceHistoryDto.fromEntity(records);
    }

    public ResAttendanceHistoryDto getMonthlyAttendanceHistory(Long memberId, int year, int month) {
        List<EventRecord> records = getMonthlyRecords(memberId, year, month);
        return ResAttendanceHistoryDto.fromEntity(records);
    }

    private List<EventRecord> getWeeklyRecords(Long memberId, int year, int month, int startDay) {
        LocalDate startOfWeek = LocalDate.of(year, month, startDay);
        LocalDate endOfWeek = startOfWeek.plusDays(6);
        return eventRecordRepository.findByMemberIdAndDateBetween(memberId, startOfWeek, endOfWeek);
    }

    private List<EventRecord> getMonthlyRecords(Long memberId, int year, int month) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);
        return eventRecordRepository.findByMemberIdAndDateBetween(memberId, startOfMonth, endOfMonth);
    }
}