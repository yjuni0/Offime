package Offime.Offime.dto.response.member;

import Offime.Offime.dto.response.member.MemberListDto;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.member.Team;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberListDto {

    private Long id;
    private String name;
    private Team team;

    @Builder
    public MemberListDto(Long id, String name, Team team) {
        this.id = id;
        this.name = name;
        this.team = team;
    }

    public static MemberListDto fromEntity(Member member){
        return MemberListDto.builder()
                .id(member.getId())
                .name(member.getName())
                .team(member.getTeam())
                .build();
    }
}
