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

    public ResAttendanceHistoryDto getDailyAttendanceHistoryOfEveryone(LocalDate date) {
        List<EventRecord> records = getDailyRecords(date);
        return ResAttendanceHistoryDto.fromEntity(records);
    }

    private List<EventRecord> getDailyRecords(LocalDate date) {
        return eventRecordRepository.findByDate(date);
    }
}
