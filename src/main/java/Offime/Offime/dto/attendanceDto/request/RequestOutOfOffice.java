package Offime.Offime.dto.attendanceDto.request;

import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.entity.attendanceEntity.EventType;
import Offime.Offime.entity.attendanceEntity.OutOfOfficeType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class RequestOutOfOffice {

    private EventType eventType;
    private OutOfOfficeType outOfOfficeType;

    public static EventRecord toEntity(RequestOutOfOffice dto, EventRecord clockInRecord) {
        return EventRecord.builder()
                .date(LocalDate.now())
                .requestTime(LocalDateTime.now())
                .clockIn(clockInRecord.getClockIn())
                .eventType(dto.eventType)
                .outOfOfficeType(dto.outOfOfficeType)
                .late(clockInRecord.getLate())
                .build();
    }
}