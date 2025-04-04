package Offime.Offime.service.attendance;

import Offime.Offime.dto.response.attendance.ResAttendanceHistoryForLeaderDto;
import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.member.Team;
import Offime.Offime.repository.attendance.EventRecordRepository;
import Offime.Offime.repository.member.MemberRepository;
import Offime.Offime.repository.vacation.VacationRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AttendanceManagerForLeaderService {

    private final EventRecordRepository eventRecordRepository;
    private final MemberRepository memberRepository;
    private final VacationRepository vacationRepository;
    private int workdayPersonnel;

    // 특정 날짜에 휴가자가 있는지 확인하는 메서드
    public boolean isOnVacation(Member member, LocalDate date) {
        return vacationRepository.existsVacationOverlap(date, date, member);
    }

    public ResAttendanceHistoryForLeaderDto getDailyAttendanceForTeam(LocalDate date, Team team) {
        List<EventRecord> records = getDailyRecordsForTeam(date, team);
        int absentPersonnelCount = 0; // 미출근 카운트
        int notYetArrivedCount = 0; // 출근 전 카운트
        List<Member> teamMembers = memberRepository.findByTeam(team);

        for (Member member : teamMembers) {
            boolean hasAttendanceRecord = eventRecordRepository.existsByMemberAndDate(member, date);

            if (isOnVacation(member, date)) {
                absentPersonnelCount++;
            } else if (!hasAttendanceRecord) {
                if (isBeforeMidnight()) {
                    notYetArrivedCount++;
                } else {
                    absentPersonnelCount++;
                }
            }
        }

        workdayPersonnel = (int) (memberRepository.countByTeam(team) - absentPersonnelCount);
        return ResAttendanceHistoryForLeaderDto.fromEntity(records, workdayPersonnel, absentPersonnelCount, date);
    }


    public ResAttendanceHistoryForLeaderDto getDailyAttendanceForAll(LocalDate date) {
        List<EventRecord> records = getDailyRecordsForAll(date);
        int absentPersonnelCount = 0; // 미출근 카운트
        int notYetArrivedCount = 0; // 출근 전 카운트
        List<Member> allMembers = memberRepository.findAll();

        for (Member member : allMembers) {
            boolean hasAttendanceRecord = eventRecordRepository.existsByMemberAndDate(member, date);

            if (isOnVacation(member, date)) {
                // 휴가 중인 경우 미출근 카운트 증가
                absentPersonnelCount++;
            } else if (!hasAttendanceRecord) {
                // 출근 기록이 없는 경우
                if (isBeforeMidnight()) {
                    // 자정 이전이면 "출근 전"
                    notYetArrivedCount++;
                } else {
                    // 자정 이후면 "미출근"
                    absentPersonnelCount++;
                }
            }
        }

        workdayPersonnel = (int) (memberRepository.count() - absentPersonnelCount);
        return ResAttendanceHistoryForLeaderDto.fromEntity(records, workdayPersonnel, absentPersonnelCount, date);
    }

    // 현재 시간이 자정 이전인지 확인하는 메서드
    private boolean isBeforeMidnight() {
        LocalTime midnight = LocalTime.MIDNIGHT; // 자정 시간
        return LocalTime.now().isBefore(midnight);
    }


    @Scheduled(cron = "0 0 0 * * *") // 매일 자정에 실행
    private void checkAbsenteeEmployees() {
        LocalDate today = LocalDate.now();
        List<Member> allMembers = memberRepository.findAll();
        int absentPersonnelCount = 0;

        for (Member member : allMembers) {
            boolean hasAttendanceRecord = eventRecordRepository.existsByMemberAndDate(member, today);

            if (!hasAttendanceRecord && !isOnVacation(member, today)) {
                // 출근 기록이 없고 휴가 중이 아닌 경우 미출근 카운트 증가
                absentPersonnelCount++;
            }
        }

        log.info("오늘 미출근 인원: {}명.", absentPersonnelCount);
    }


    // 전체 직원 수 조회
    public long getTotalEmployeeCount() {
        return memberRepository.count();
    }

    // 팀별 직원 수 조회
    public long getEmployeeCountByTeam(Team team) {
        return memberRepository.countByTeam(team);
    }

    // 날짜에 해당하는 모든 출석 기록 조회
    private List<EventRecord> getDailyRecordsForAll(LocalDate date) {
        return eventRecordRepository.findByDate(date);
    }

    // 팀에 해당하는 날짜의 출석 기록 조회
    private List<EventRecord> getDailyRecordsForTeam(LocalDate date, Team team) {
        return eventRecordRepository.findByDateAndTeam(date, team);
    }
}