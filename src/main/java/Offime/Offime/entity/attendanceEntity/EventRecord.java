package Offime.Offime.entity.attendanceEntity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "EVENT_RECORDS")
@Getter
@Setter
public class EventRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "DATE", nullable = false)
    private LocalDate date;

    @Column(name = "EVENT_REQUEST_TIME")
    private LocalDateTime eventRequestTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "EVENT_TYPE", nullable = false)
    private EventType eventType;

    @Enumerated(EnumType.STRING)
    @Column(name = "OUT_OF_OFFICE")
    private OutOfOffice outOfOffice;

//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID", nullable = false)
//    private Member member;

    public enum EventType {
        출근, 자리비움, 복귀, 퇴근
    }

    public enum OutOfOffice {
        휴식, 식사, 기타
    }
}
