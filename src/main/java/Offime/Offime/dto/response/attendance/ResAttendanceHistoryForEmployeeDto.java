package Offime.Offime.dto.response.attendance;

import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.attendance.EventType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ResAttendanceHistoryForEmployeeDto {

    private int clockInCount;
    private int lateCount;
    private int totalLateMinutes;
    private int leaveEarlyCount;
    private int totalLeaveEarlyMinutes;

    @Builder
    public ResAttendanceHistoryForEmployeeDto(
            int clockInCount, int lateCount, int totalLateMinutes, int leaveEarlyCount, int totalLeaveEarlyMinutes) {
        this.clockInCount = clockInCount;
        this.lateCount = lateCount;
        this.totalLateMinutes = totalLateMinutes;
        this.leaveEarlyCount = leaveEarlyCount;
        this.totalLeaveEarlyMinutes = totalLeaveEarlyMinutes;
    }

    public static ResAttendanceHistoryForEmployeeDto fromEntity(List<EventRecord> eventRecord){
        return ResAttendanceHistoryForEmployeeDto.builder()
                .clockInCount((int) eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.출근).count())
                .lateCount((int) eventRecord.stream()
                        .filter(r -> r.getEventType() == EventType.출근)
                        .filter(r -> r.getLate() > 0)
                        .count())
                .totalLateMinutes(eventRecord.stream()
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
                .build();
    }
}