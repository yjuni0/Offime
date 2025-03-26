package Offime.Offime.service.attendanceService;

import Offime.Offime.dto.attendanceDto.response.ResAttendanceHistoryDto;
import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.repository.attendanceRepository.EventRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeAttendanceManagerService {
    private final EventRecordRepository eventRecordRepository;

    // 주별 통계 조회
    public ResAttendanceHistoryDto getWeeklyAttendanceHistory(int year, int month, int startDay) {
        List<EventRecord> records = getWeeklyRecords(year, month, startDay);
        return ResAttendanceHistoryDto.fromEntity(records);
    }

    // 월별 통계 조회
    public ResAttendanceHistoryDto getMonthlyAttendanceHistory(int year, int month) {
        List<EventRecord> records = getMonthlyRecords(year, month);
        return ResAttendanceHistoryDto.fromEntity(records);
    }

    private List<EventRecord> getWeeklyRecords(int year, int month, int startDay) {
        LocalDate startOfWeek = LocalDate.of(year, month, startDay);
        LocalDate endOfWeek = startOfWeek.plusDays(6);
        return eventRecordRepository.findByDateBetween(startOfWeek, endOfWeek);
    }

    private List<EventRecord> getMonthlyRecords(int year, int month) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);
        return eventRecordRepository.findByDateBetween(startOfMonth, endOfMonth);
    }
}