package Offime.Offime.entity.schedule;

import Offime.Offime.common.BaseTimeEntity;
import Offime.Offime.entity.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Schedule extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID", nullable = true, foreignKey = @ForeignKey(name = "FK_SCHEDULE_MEMBER"))
    private Member member;

    @Column(name = "DATE", nullable = false)
    private LocalDate date;

    @Column(name = "START_TIME", nullable = false)
    private LocalTime startTime;

    @Column(name = "END_TIME", nullable = false)
    private LocalTime endTime;

    @Column(name = "BREAK_TIME", nullable = false)
    private LocalTime breakTime;

    @Column(name = "MEMO", columnDefinition = "TEXT")
    private String memo;

    @Column(name = "COLOR", nullable = false)
    private String color;

}
