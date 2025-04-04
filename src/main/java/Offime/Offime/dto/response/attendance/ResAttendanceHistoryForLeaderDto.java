package Offime.Offime.dto.response.attendance;

import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.attendance.EventType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static Offime.Offime.entity.member.WorkStatus.*;

@Getter
@NoArgsConstructor
public class ResAttendanceHistoryForLeaderDto {

    private static final LocalTime COMPANY_START_TIME = LocalTime.of(9, 0);

    private int clockInCount;
    private int absentCount;
    private int beforeClockInCount;
    private int lateCount;
    private int totalLateMinutes;
    private int leaveEarlyCount;
    private int totalLeaveEarlyMinutes;
    private int atWorkCount;
    private int onBreakCount;
    private int offWorkCount;

    @Builder
    public ResAttendanceHistoryForLeaderDto(
            int clockInCount, int absentCount, int beforeClockInCount, int lateCount, int totalLateMinutes,
            int leaveEarlyCount, int totalLeaveEarlyMinutes, int atWorkCount, int onBreakCount, int offWorkCount) {
        this.clockInCount = clockInCount;
        this.absentCount = absentCount;
        this.beforeClockInCount = beforeClockInCount;
        this.lateCount = lateCount;
        this.totalLateMinutes = totalLateMinutes;
        this.leaveEarlyCount = leaveEarlyCount;
        this.totalLeaveEarlyMinutes = totalLeaveEarlyMinutes;
        this.atWorkCount = atWorkCount;
        this.onBreakCount = onBreakCount;
        this.offWorkCount = offWorkCount;
    }

    public static ResAttendanceHistoryForLeaderDto fromEntity(
            List<EventRecord> eventRecord, int workdayPersonnel, int absentCount, LocalDate requestDate){

        LocalTime currentTime = LocalTime.now();

        int clockInCount = (int) eventRecord.stream()
                .filter(r -> r.getEventType() == EventType.출근)
                .count();

        int beforeClockInCount;
        if (currentTime.isBefore(COMPANY_START_TIME)) {
            // 9시 이전: 출근 전 = 오늘 근무할 인원 전체
            beforeClockInCount = workdayPersonnel;
        } else {
            // 9시 이후: 출근 전 = 오늘 근무할 인원 - 출근한 인원
            beforeClockInCount = workdayPersonnel - clockInCount;
        }

        return ResAttendanceHistoryForLeaderDto.builder()
                .clockInCount(clockInCount)
                .absentCount(absentCount)
                .beforeClockInCount(beforeClockInCount)
                .lateCount((int) eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.출근)
                        .filter(r -> r.getLate() > 0)
                        .count())
                .totalLateMinutes( eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.출근)
                        .mapToInt(EventRecord::getLate)
                        .sum())
                .leaveEarlyCount((int) eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.퇴근)
                        .filter(r -> r.getLeaveEarly() > 0)
                        .count())
                .totalLeaveEarlyMinutes(eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.퇴근)
                        .mapToInt(EventRecord::getLeaveEarly)
                        .sum())
                .atWorkCount((int) eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.출근)
                        .filter(r -> r.getMember().getWorkStatus() == 근무중)
                        .count())
                .onBreakCount((int) eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.출근)
                        .filter(r -> r.getMember().getWorkStatus() == 자리비움중)
                        .count())
                .offWorkCount((int) eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.출근)
                        .filter(r -> r.getMember().getWorkStatus() == 퇴근)
                        .count())
                .build();
    }
}