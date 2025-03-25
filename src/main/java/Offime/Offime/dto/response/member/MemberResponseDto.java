package Offime.Offime.dto.response.member;

import Offime.Offime.common.Role;
import Offime.Offime.common.Team;
import Offime.Offime.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class MemberResponseDto {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private Team team;

    @Builder
    public MemberResponseDto(Long id, String name, String email,String phone, Role role, Team team) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.team = team;
    }

    public static MemberResponseDto fromEntity (Member member){
        return MemberResponseDto.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .phone(member.getPhone())
                .role(member.getRole())
                .team(member.getTeam())
                .build();
    }
}
