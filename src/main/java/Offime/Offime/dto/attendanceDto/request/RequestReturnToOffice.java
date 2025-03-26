package Offime.Offime.dto.attendanceDto.request;

import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.entity.attendanceEntity.EventType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class RequestReturnToOffice {

    private double latitude;
    private double longitude;
    private EventType eventType;

    public static EventRecord toEntity(RequestReturnToOffice dto, EventRecord clockInRecord) {
        return EventRecord.builder()
                .date(LocalDate.now())
                .requestTime(LocalDateTime.now())
                .clockIn(clockInRecord.getClockIn())
                .eventType(dto.eventType)
                .late(clockInRecord.getLate())
                .build();
    }
}