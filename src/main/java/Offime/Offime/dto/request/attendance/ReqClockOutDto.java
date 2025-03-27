package Offime.Offime.dto.request.attendance;

import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.attendance.EventType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class ReqClockOutDto {


    public static EventRecord toEntity(EventRecord clockInRecord, long leaveEarly) {
        return EventRecord.builder()
                .date(LocalDate.now())
                .requestTime(LocalDateTime.now())
                .clockIn(clockInRecord.getClockIn())
                .clockOut(LocalTime.now())
                .eventType(EventType.퇴근)
                .late(clockInRecord.getLate())
                .leaveEarly(leaveEarly)
                .build();
    }
}