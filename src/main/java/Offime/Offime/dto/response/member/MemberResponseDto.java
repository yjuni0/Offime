package Offime.Offime.dto.response.member;

import Offime.Offime.common.Role;
import Offime.Offime.entity.member.Team;
import Offime.Offime.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
public class MemberResponseDto {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private Team team;
    private BigDecimal availableLeaveDays;

    @Builder
    public MemberResponseDto(Long id, String name, String email,String phone, Role role, Team team,BigDecimal availableLeaveDays) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.team = team;
        this.availableLeaveDays = availableLeaveDays;
    }

    public static MemberResponseDto fromEntity (Member member){
        return MemberResponseDto.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .phone(member.getPhone())
                .role(member.getRole())
                .team(member.getTeam())
                .availableLeaveDays(member.getAvailableLeaveDays())
                .build();
    }
}
