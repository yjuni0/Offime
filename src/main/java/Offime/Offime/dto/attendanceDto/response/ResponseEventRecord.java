//package Offime.Offime.dto.attendanceDto.response;
//
//import Offime.Offime.entity.attendanceEntity.EventRecord;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class ResponseEventRecord {
//
//    private Long id;
//    private LocalDate date;
//    private LocalDateTime RequestTime;
//    private EventRecord.EventType eventType;
//    private EventRecord.OutOfOfficeType outOfOfficeType;
//
//    public static ResponseEventRecord fromEntity(EventRecord eventRecord) {
//        return new ResponseEventRecord(
//                eventRecord.getId(),
//                eventRecord.getDate(),
//                eventRecord.getRequestTime(),
//                eventRecord.getEventType(),
//                eventRecord.getOutOfOfficeType()
//        );
//    }
//}
