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
public class RequestOutOfOffice {

    private EventType eventType;
    private OutOfOfficeType outOfOfficeType;

    public static EventRecord toEntity(RequestOutOfOffice requestOutOfOffice, LocalTime clockInTime) {
        return EventRecord.builder()
                .date(LocalDate.now())
                .requestTime(LocalDateTime.now())
                .clockIn(clockInTime)
                .eventType(requestOutOfOffice.eventType)
                .outOfOfficeType(requestOutOfOffice.outOfOfficeType)
//                .isLate(requestEventRecord.)
                .build();
    }
}

