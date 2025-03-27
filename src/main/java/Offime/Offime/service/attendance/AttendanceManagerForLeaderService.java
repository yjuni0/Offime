package Offime.Offime.service.attendance;

import Offime.Offime.dto.response.attendance.ResAttendanceHistoryForLeaderDto;
import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.member.Team;
import Offime.Offime.repository.attendance.EventRecordRepository;
import Offime.Offime.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceManagerForLeaderService {

    private final EventRecordRepository eventRecordRepository;

//    private static final
    private static final LocalTime COMPANY_START_TIME = LocalTime.of(9, 0);

    public ResAttendanceHistoryForLeaderDto getDailyAttendanceHistoryForAll(Member member, LocalDate date) {
        List<EventRecord> records = getDailyRecordsForAll(member, date);
        return ResAttendanceHistoryForLeaderDto.fromEntity(records);
    }

    private List<EventRecord> getDailyRecordsForAll(Member member, LocalDate date) {
        return eventRecordRepository.findByDate(date);
    }

    private List<EventRecord> getDailyRecordsForTeam(LocalDate date, Team team) {
        return eventRecordRepository.findByDateAndTeam(date, team);
    }
}