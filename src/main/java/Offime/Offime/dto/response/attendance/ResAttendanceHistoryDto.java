package Offime.Offime.dto.response.attendance;

import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.attendance.EventType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ResAttendanceHistoryDto {

    private long clockInCount;
    private long lateCount;
    private long totalLateMinutes;
    private long leaveEarlyCount;
    private long totalLeaveEarlyMinutes;

    @Builder
    public ResAttendanceHistoryDto(long clockInCount, long lateCount, long totalLateMinutes, long leaveEarlyCount, long totalLeaveEarlyMinutes) {
        this.clockInCount = clockInCount;
        this.lateCount = lateCount;
        this.totalLateMinutes = totalLateMinutes;
        this.leaveEarlyCount = leaveEarlyCount;
        this.totalLeaveEarlyMinutes = totalLeaveEarlyMinutes;
    }

    public static ResAttendanceHistoryDto fromEntity(List<EventRecord> eventRecord){
        return ResAttendanceHistoryDto.builder()
                .clockInCount(eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.출근).count())
                .lateCount(eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.출근)
                        .filter(r -> r.getLate() > 0)
                        .count())
                .totalLateMinutes(eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.출근)
                        .mapToLong(EventRecord::getLate)
                        .sum())
                .leaveEarlyCount(eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.퇴근)
                        .filter(r -> r.getLeaveEarly() > 0).count())
                .totalLeaveEarlyMinutes(eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.퇴근)
                        .mapToLong(EventRecord::getLeaveEarly).sum())
                .build();
    }
}