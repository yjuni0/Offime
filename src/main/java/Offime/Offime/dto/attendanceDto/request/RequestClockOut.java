package Offime.Offime.dto.attendanceDto.request;

import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.entity.attendanceEntity.EventType;
import Offime.Offime.entity.attendanceEntity.OutOfOfficeType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class RequestClockOut {

    private EventType eventType;

    public static EventRecord toEntity(RequestClockOut dto, EventRecord clockInRecord, long leaveEarly) {
        return EventRecord.builder()
                .date(LocalDate.now())
                .requestTime(LocalDateTime.now())
                .clockIn(clockInRecord.getClockIn())
                .clockOut(LocalTime.now())
                .eventType(dto.eventType)
                .late(clockInRecord.getLate())
                .leaveEarly(leaveEarly)
                .build();
    }
}