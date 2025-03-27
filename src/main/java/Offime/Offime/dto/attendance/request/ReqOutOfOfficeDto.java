package Offime.Offime.dto.attendance.request;

import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.attendance.EventType;
import Offime.Offime.entity.attendance.OutOfOfficeType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ReqOutOfOfficeDto {

    private OutOfOfficeType outOfOfficeType;

    public static EventRecord toEntity(ReqOutOfOfficeDto dto, EventRecord clockInRecord) {
        return EventRecord.builder()
                .date(LocalDate.now())
                .requestTime(LocalDateTime.now())
                .clockIn(clockInRecord.getClockIn())
                .eventType(EventType.자리비움)
                .outOfOfficeType(dto.outOfOfficeType)
                .late(clockInRecord.getLate())
                .build();
    }
}