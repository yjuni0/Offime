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
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AttendanceManagerForLeaderService {

    private final EventRecordRepository eventRecordRepository;
    private final MemberRepository memberRepository;
    private int workdayPersonnel;

    public ResAttendanceHistoryForLeaderDto getDailyAttendanceForAll(LocalDate date) {
        List<EventRecord> records = getDailyRecordsForAll(date);
        // 휴가자 리파지토리 조회(member, date)
        int absentPersonnelCount = 0;
        return ResAttendanceHistoryForLeaderDto.fromEntity(records, workdayPersonnel, absentPersonnelCount, date);
    }

    public ResAttendanceHistoryForLeaderDto getDailyAttendanceForTeam(LocalDate date , Team team){
        List<EventRecord> records = getDailyRecordsForTeam(date, team);
        int absentPersonnelCount = 0;
        return ResAttendanceHistoryForLeaderDto.fromEntity(records, workdayPersonnel, absentPersonnelCount, date);
    }
    //==================================================================================================================
    @PostConstruct
    private void init() {
        calculateWorkdayPersonnel();
    }

    @Scheduled(cron = "0 0 0 * * *") // 매일 자정에 실행
    private void calculateWorkdayPersonnel() {
        // 근무인원 = 전체 인원 - 휴가자(추후에)
        workdayPersonnel = (int) (memberRepository.count() - 0);
        log.info("오늘 근무인원 - " + workdayPersonnel + "명.");
    }

    private List<EventRecord> getDailyRecordsForAll(LocalDate date) {
        return eventRecordRepository.findByDate(date);
    }

    private List<EventRecord> getDailyRecordsForTeam(LocalDate date, Team team) {
        return eventRecordRepository.findByDateAndTeam(date, team);
    }
}