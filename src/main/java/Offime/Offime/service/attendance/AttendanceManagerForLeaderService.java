package Offime.Offime.service.attendance;

import Offime.Offime.dto.response.attendance.ResAttendanceHistoryForLeaderDto;
import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.member.Team;
import Offime.Offime.repository.attendance.EventRecordRepository;
import Offime.Offime.repository.member.MemberRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Service
@RequiredArgsConstructor
public class AttendanceManagerForLeaderService {

    private final EventRecordRepository eventRecordRepository;
    private final MemberRepository memberRepository;

    private static final LocalTime COMPANY_START_TIME = LocalTime.of(9, 0);
    private int workdayPersonnel;

    @Scheduled(cron = "0 0 0 * * *") // 매일 자정에 실행
    public void updateWorkdayPersonnel() {
        // 추후 휴가 관련 인원 제외할 로직 필요
        workdayPersonnel = (int) memberRepository.count();
        log.info("오늘 근무인원 - " + workdayPersonnel);
    }

    public ResAttendanceHistoryForLeaderDto getDailyAttendanceHistoryForAll(Member member, LocalDate date) {
        List<EventRecord> records = getDailyRecordsForAll(member, date);

        return ResAttendanceHistoryForLeaderDto.fromEntity(records);
    }


    //==================================================================================================================
    private List<EventRecord> getDailyRecordsForAll(Member member, LocalDate date) {
        return eventRecordRepository.findByDate(date);
    }

    private List<EventRecord> getDailyRecordsForTeam(LocalDate date, Team team) {
        return eventRecordRepository.findByDateAndTeam(date, team);
    }

    @PostConstruct
    public void init() {
        updateWorkdayPersonnel();
    }
}