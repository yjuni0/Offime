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

    private double latitude;
    private double longitude;
    private EventType eventType;


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

