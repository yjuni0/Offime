package Offime.Offime.dto.attendanceDto.request;

import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.entity.attendanceEntity.EventType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class RequestReturnToOffice {

    private LocalDate date;
    private LocalDateTime requestTime;
    private LocalTime clockIn;
    private EventType eventType;
    private double latitude;
    private double longitude;

    public static EventRecord toEntity(RequestReturnToOffice requestReturnToOffice, LocalTime clockInTime) {
        return EventRecord.builder()
                .date(LocalDate.now())
                .requestTime(LocalDateTime.now())
                .clockIn(clockInTime)
                .eventType(requestReturnToOffice.eventType)
//                .isLate(requestEventRecord.)
                .build();
    }
}

