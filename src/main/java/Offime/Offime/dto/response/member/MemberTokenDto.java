package Offime.Offime.dto.response.member;

import Offime.Offime.common.Role;
import Offime.Offime.common.Team;
import Offime.Offime.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@NoArgsConstructor
public class MemberTokenDto implements UserDetails {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private Team team;
    private String joinDate;
    private String token;

    @Builder
    public MemberTokenDto(Long id, String name, String email, Role role, Team team, String joinDate, String token) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.team = team;
        this.joinDate = joinDate;
        this.token = token;
    }

    public static MemberTokenDto fromEntity(UserDetails userDetails, String token){
        Member member = (Member)userDetails;
        return MemberTokenDto.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .role(member.getRole())
                .team(member.getTeam())
                .joinDate(member.getCreatedDate())
                .token(token)
                .build();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return "";
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }
    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }
    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}