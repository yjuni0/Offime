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
public class ReqClockInDto {

    private double latitude;
    private double longitude;

    public static EventRecord toEntity(long late) {
        return EventRecord.builder()
                .date(LocalDate.now())
                .requestTime(LocalDateTime.now())
                .clockIn(LocalTime.now())
                .eventType(EventType.출근)
                .late(late)
                .build();
    }
}