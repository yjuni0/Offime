package Offime.Offime.entity.attendanceEntity;

import Offime.Offime.common.LocalTimeConverter;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "EVENT_RECORDS")

public class EventRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "DATE", nullable = false)
    private LocalDate date;

    @Column(name = "REQUEST_TIME", nullable = false)
    private LocalDateTime requestTime;

    @Column(name = "CLOCK_IN", columnDefinition = "TIME(0)")
    @Convert(converter = LocalTimeConverter.class)
    private LocalTime clockIn;

    @Column(name = "CLOCK_OUT", columnDefinition = "TIME(0)")
    @Convert(converter = LocalTimeConverter.class)
    private LocalTime clockOut;

    @Enumerated(EnumType.STRING)
    @Column(name = "EVENT_TYPE", nullable = false)
    private EventType eventType;

    @Enumerated(EnumType.STRING)
    @Column(name = "OUT_OF_OFFICE_TYPE")
    private OutOfOfficeType outOfOfficeType;

    @Column(name = "IS_LATE")
    private boolean isLate;

    @Column(name = "IS_LEAVE_EARLY")
    private boolean isLeaveEarly;

//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID", nullable = false)
//    private Member member;

    @Builder
    public EventRecord(Long id, LocalDate date, LocalDateTime requestTime, LocalTime clockIn, LocalTime clockOut,
                       EventType eventType, OutOfOfficeType outOfOfficeType, boolean isLate, boolean isLeaveEarly) {
        this.id = id;
        this.date = date;
        this.requestTime = requestTime;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
        this.eventType = eventType;
        this.outOfOfficeType = outOfOfficeType;
        this.isLate = isLate;
        this.isLeaveEarly = isLeaveEarly;
    }

    //==================================================================================================================
//    public void setClockIn(LocalTime clockIn) {
//        this.clockIn = clockIn;
//    }
//
//    public void setClockOut(LocalTime clockOut) {
//        this.clockOut = clockOut;
//    }
}
