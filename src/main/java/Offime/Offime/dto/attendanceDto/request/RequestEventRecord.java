package Offime.Offime.dto.attendanceDto.request;

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
public class RequestEventRecord {

    private LocalDate date;
    private LocalDateTime requestTime;
    private LocalTime clockIn;
    private LocalTime clockOut;
    private EventType eventType;
    private OutOfOfficeType outOfOfficeType;
    private double latitude;
    private double longitude;


    @Builder
    public RequestEventRecord(LocalDate date, LocalDateTime requestTime, LocalTime clockIn, LocalTime clockOut,
                              EventType eventType, OutOfOfficeType outOfOfficeType, double latitude, double longitude) {
        this.date = date;
        this.requestTime = requestTime;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
        this.eventType = eventType;
        this.outOfOfficeType = outOfOfficeType;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public EventRecord toEntity(RequestEventRecord requestEventRecord) {
        return EventRecord.builder()
                .date(requestEventRecord.date)
                .requestTime(requestEventRecord.requestTime)
                .clockIn(requestEventRecord.clockIn)
                .clockOut(requestEventRecord.clockOut)
                .eventType(requestEventRecord.eventType)
                .outOfOfficeType(requestEventRecord.outOfOfficeType)
//                .isLate(requestEventRecord.)
                .build();
    }

}