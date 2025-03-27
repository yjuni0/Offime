package Offime.Offime.dto.attendance.request;

import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.attendance.EventType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ReqReturnToOfficeDto {

    private double latitude;
    private double longitude;

    public static EventRecord toEntity( EventRecord clockInRecord) {
        return EventRecord.builder()
                .date(LocalDate.now())
                .requestTime(LocalDateTime.now())
                .clockIn(clockInRecord.getClockIn())
                .eventType(EventType.복귀)
                .late(clockInRecord.getLate())
                .build();
    }
}