package Offime.Offime.dto.response.member;

import Offime.Offime.common.Role;
import Offime.Offime.entity.member.Team;
import Offime.Offime.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MemberTokenDto  {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private Role role;
    private Team team;
    private String createdDate;
    private String token;

    @Builder
    public MemberTokenDto(Long id, String name, String email, String password, String phone, Role role, Team team, String createdDate, String token) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
        this.team = team;
        this.createdDate = createdDate;
        this.token = token;
    }

    public static MemberTokenDto fromEntity(Member member, String token){
        return MemberTokenDto.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .password(member.getPassword())
                .phone(member.getPhone())
                .role(member.getRole())
                .team(member.getTeam())
                .createdDate(member.getCreatedDate())
                .token(token)
                .build();
    }

}