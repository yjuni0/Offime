package Offime.Offime.dto.response.attendance;

import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.attendance.EventType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static Offime.Offime.entity.attendance.WorkStatus.*;

@Getter
@NoArgsConstructor
public class ResAttendanceHistoryForLeaderDto {

    private int clockInCount;
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
            int clockInCount, int beforeClockInCount, int lateCount, int totalLateMinutes,
            int leaveEarlyCount, int totalLeaveEarlyMinutes, int atWorkCount, int onBreakCount, int offWorkCount) {
        this.clockInCount = clockInCount;
        this.beforeClockInCount = beforeClockInCount;
        this.lateCount = lateCount;
        this.totalLateMinutes = totalLateMinutes;
        this.leaveEarlyCount = leaveEarlyCount;
        this.totalLeaveEarlyMinutes = totalLeaveEarlyMinutes;
        this.atWorkCount = atWorkCount;
        this.onBreakCount = onBreakCount;
        this.offWorkCount = offWorkCount;
    }

    public static ResAttendanceHistoryForLeaderDto fromEntity(List<EventRecord> eventRecord){
        return ResAttendanceHistoryForLeaderDto.builder()
                .clockInCount((int) eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.출근).count())

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