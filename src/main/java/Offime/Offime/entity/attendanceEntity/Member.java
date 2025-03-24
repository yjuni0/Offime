package Offime.Offime.entity.attendanceEntity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MEMBER")
@Getter
@Setter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME", nullable = false, length = 10)
    private String name;

    @Column(name = "EMAIL", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "PASSWORD", nullable = false, length = 20)
    private String password;

    @Column(name = "PHONE", nullable = false, length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "ROLE", nullable = false)
    private Role role;

    @Column(name = "TEAM", length = 50)
    private String team;

    @Column(name = "JOIN_DATE")
    private LocalDateTime joinDate;

    @Column(name = "DELETE_DATE")
    private LocalDateTime deleteDate;

    @Column(name = "VACATION")
    private Integer vacation;

    @Column(name = "WORK_STATUS", length = 100)
    private String workStatus;
}