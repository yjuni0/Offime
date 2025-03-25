package Offime.Offime.entity.member;

import Offime.Offime.common.BaseTimeEntity;
import Offime.Offime.common.Role;
import Offime.Offime.common.Team;
import Offime.Offime.entity.vacation.Vacation;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member extends BaseTimeEntity implements UserDetails {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String password;

    private String phone;

    @Setter
    private int availableLeaveDays;


    @Column(name = "WORK_STATUS")
    private String workStatus;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Team team;

    @Transient
    private String token;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vacation> vacations;


    @Builder
    public Member(Long id, String name, String email, String password, String phone, int availableLeaveDays, String workStatus, Role role, Team team, String token) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.availableLeaveDays = availableLeaveDays;
        this.workStatus = workStatus;
        this.role = role;
        this.team = team;
        this.token = token;
    }

    public void prePersist() {
        if (this.availableLeaveDays == 0) { this.availableLeaveDays = 12; }
        if (this.role == null) { this.role = Role.USER; }
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add( new SimpleGrantedAuthority("ROLE_" + this.role.name()));
        return authorities;
    }
}
