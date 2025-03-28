//package Offime.Offime.service.attendance;
//
//import Offime.Offime.dto.response.attendance.ResAttendanceHistoryForLeaderDto;
//import Offime.Offime.entity.attendance.EventRecord;
//import Offime.Offime.entity.member.Member;
//import Offime.Offime.entity.member.Team;
//import Offime.Offime.repository.attendance.EventRecordRepository;
//import Offime.Offime.repository.member.MemberRepository;
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//
//import static Offime.Offime.entity.attendance.EventType.출근;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class AttendanceManagerForLeaderService {
//
//    private final EventRecordRepository eventRecordRepository;
//    private final MemberRepository memberRepository;
//    private int workdayPersonnel;
//
//    public ResAttendanceHistoryForLeaderDto getDailyAttendanceHistoryForAll(Member member, LocalDate date) {
//        List<EventRecord> records = getDailyRecordsForAll(date);
//        int absentPersonnelCount = calculateAbsentPersonnelCount(date);
//        return ResAttendanceHistoryForLeaderDto.fromEntity(records, workdayPersonnel, absentPersonnelCount, date);
//    }
//    //==================================================================================================================
//    @PostConstruct
//    private void init() {
//        calculateWorkdayPersonnel();
//    }
//
//    @Scheduled(cron = "0 0 0 * * *") // 매일 자정에 실행
//    private void calculateWorkdayPersonnel() {
//        // 근무인원 = 전체 인원 - 휴가자(추후에)
//        workdayPersonnel = (int) (memberRepository.count() - 0);
//        log.info("오늘 근무인원 - " + workdayPersonnel + "명.");
//    }
//
//    private List<EventRecord> getDailyRecordsForAll(LocalDate date) {
//        return eventRecordRepository.findByDate(date);
//    }
//
//    private List<EventRecord> getDailyRecordsForTeam(LocalDate date, Team team) {
//        return eventRecordRepository.findByDateAndTeam(date, team);
//    }
//
////    private int calculateAbsentPersonnelCount(LocalDate date) {
////        LocalDate today = LocalDate.now();
////        if (date.equals(today)) {
////            // 오늘 날짜: 휴가자만 계산
////            return calculateVacationCount(date);
////        } else if (date.isBefore(today)) {
////            // 과거 날짜: 그때 전체 직원 수 - (휴가자 + 결석자)
////            long totalEmployees = memberRepository.countByJoinDateLessThanEqual(date);
////            long clockInCount = eventRecordRepository.countByDateAndEventType(date, 출근);
////            int vacationCount = calculateVacationCount(date);
////            return (int) (totalEmployees - clockInCount + vacationCount);
////        } else {
////            // 미래 날짜: 현재로서는 계산 불가능
////            throw new IllegalArgumentException("미래 날짜에 대한 결석자 수는 계산할 수 없습니다.");
////        }
////    }
////
////    private int calculateVacationCount(LocalDate date) {
////        // 휴가자 수 계산 로직
////        return 0;
////    }
////
////    private int calculateVacationCountForTeam(LocalDate date, Team team) {
////        // 팀별 휴가자 수 계산 로직
////        return 0;
////    }
//}