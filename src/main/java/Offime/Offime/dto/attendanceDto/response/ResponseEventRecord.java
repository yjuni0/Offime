package Offime.Offime.dto.attendanceDto.response;

import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.entity.attendanceEntity.EventType;
import Offime.Offime.entity.attendanceEntity.OutOfOfficeType;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class ResponseEventRecord {

    private Long id;
    private LocalDate date;
    private LocalDateTime requestTime;
    private LocalTime clockIn;
    private LocalTime clockOut;
    private EventType eventType;
    private OutOfOfficeType outOfOfficeType;
    boolean isLate;
    boolean isLeaveEarly;

    @Builder
    public ResponseEventRecord(Long id, LocalDate date, LocalDateTime requestTime, LocalTime clockIn, LocalTime clockOut,
                               EventType eventType, OutOfOfficeType outOfOfficeType, boolean isLate, boolean isLeaveEarly) {
        this.id = id;
        this.date = date;
        this.requestTime = requestTime;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
        this.eventType = eventType;
        this.outOfOfficeType = outOfOfficeType;
        this.isLate = isLate;
        this.isLeaveEarly = isLeaveEarly;
    }

    public static ResponseEventRecord fromEntity(EventRecord eventRecord) {
        return ResponseEventRecord.builder()
                .id(eventRecord.getId())
                .date(eventRecord.getDate())
                .requestTime(eventRecord.getRequestTime())
                .clockIn(eventRecord.getClockIn())
                .clockOut(eventRecord.getClockOut())
                .eventType(eventRecord.getEventType())
                .outOfOfficeType(eventRecord.getOutOfOfficeType())
//                .isLate(eventRecord.isLate())
//                .isLeaveEarly(eventRecord.isLeaveEarly())
                .build();
    }
}
