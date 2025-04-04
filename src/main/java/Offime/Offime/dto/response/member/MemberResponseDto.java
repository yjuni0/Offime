package Offime.Offime.dto.response.member;

import Offime.Offime.common.Role;
import Offime.Offime.entity.member.MemberProfileFiles;
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
<<<<<<< HEAD
    private BigDecimal availableLeaveDays;

    @Builder
    public MemberResponseDto(Long id, String name, String email,String phone, Role role, Team team,BigDecimal availableLeaveDays) {
=======
    private String profileImageUrl;
    private String workStatus;

    @Builder
    public MemberResponseDto(Long id, String name, String email,String phone, Role role, Team team, String profileImageUrl, String workStatus) {
>>>>>>> 3b1e12d85a949549e516839c8699a7ce43a6a5d6
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.team = team;
<<<<<<< HEAD
        this.availableLeaveDays = availableLeaveDays;
=======
        this.profileImageUrl = profileImageUrl;
        this.workStatus = workStatus;
>>>>>>> 3b1e12d85a949549e516839c8699a7ce43a6a5d6
    }

    public static MemberResponseDto fromEntity (Member member, String profileImageUrl){
        return MemberResponseDto.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .phone(member.getPhone())
                .role(member.getRole())
                .team(member.getTeam())
<<<<<<< HEAD
                .availableLeaveDays(member.getAvailableLeaveDays())
=======
                .profileImageUrl(profileImageUrl)
                .workStatus(member.getWorkStatus().toString())
>>>>>>> 3b1e12d85a949549e516839c8699a7ce43a6a5d6
                .build();
    }
}
