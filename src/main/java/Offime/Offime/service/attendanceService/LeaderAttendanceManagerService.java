package Offime.Offime.service.attendanceService;

import Offime.Offime.dto.attendanceDto.response.ResAttendanceHistoryDto;
import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.repository.attendanceRepository.EventRecordRepository;
import Offime.Offime.repository.attendanceRepository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderAttendanceManagerService {

    private final EventRecordRepository eventRecordRepository;
    private final MemberRepository memberRepository;

    private static final LocalTime COMPANY_START_TIME = LocalTime.of(9, 0);
    private static final LocalTime COMPANY_END_TIME = LocalTime.of(18, 0);

    public ResAttendanceHistoryDto getWeeklyAttendanceHistory(int year, int month, int startDay) {
        List<EventRecord> records = getWeeklyRecords(year, month, startDay);
        return ResAttendanceHistoryDto.fromEntity(records);
    }

    public ResAttendanceHistoryDto getMonthlyAttendanceHistory(int year, int month) {
        List<EventRecord> records = getMonthlyRecords(year, month);
        return ResAttendanceHistoryDto.fromEntity(records);
    }

    private List<EventRecord> getWeeklyRecords(int year, int month, int startDay) {
        LocalDate startOfWeek = LocalDate.of(year, month, startDay);
        LocalDate endOfWeek = startOfWeek.plusDays(6);
        return eventRecordRepository.findByDateBetween(startOfWeek, endOfWeek);
    }
}
