package Offime.Offime.dto.attendanceDto.response;

import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.entity.attendanceEntity.EventType;
import Offime.Offime.entity.attendanceEntity.OutOfOfficeType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class ResAttendanceHistoryDto {

    private Long id;
    private LocalDate date;
    private LocalDateTime requestTime;
    private LocalTime clockIn;
    private LocalTime clockOut;
    private EventType eventType;
    private OutOfOfficeType outOfOfficeType;
    long late;
    long leaveEarly;

    @Builder
    public ResAttendanceHistoryDto(Long id, LocalDate date, LocalDateTime requestTime, LocalTime clockIn, LocalTime clockOut,
                                   EventType eventType, OutOfOfficeType outOfOfficeType, long late, long leaveEarly) {
        this.id = id;
        this.date = date;
        this.requestTime = requestTime;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
        this.eventType = eventType;
        this.outOfOfficeType = outOfOfficeType;
        this.late = late;
        this.leaveEarly = leaveEarly;
    }

    public static ResAttendanceHistoryDto fromEntity(EventRecord eventRecord) {
        return ResAttendanceHistoryDto.builder()
                .id(eventRecord.getId())
                .date(eventRecord.getDate())
                .requestTime(eventRecord.getRequestTime())
                .clockIn(eventRecord.getClockIn())
                .clockOut(eventRecord.getClockOut())
                .eventType(eventRecord.getEventType())
                .outOfOfficeType(eventRecord.getOutOfOfficeType())
                .late(eventRecord.getLate())
                .leaveEarly(eventRecord.getLeaveEarly())
                .build();
    }
}
