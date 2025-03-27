package Offime.Offime.service.member;

import Offime.Offime.dto.request.member.MemberLoginDto;
import Offime.Offime.dto.request.member.MemberRegisterDto;
import Offime.Offime.dto.response.member.MemberResponseDto;
import Offime.Offime.dto.response.member.MemberTokenDto;
import Offime.Offime.entity.member.Member;
import Offime.Offime.exception.MemberException;
import Offime.Offime.exception.ResourceNotFoundException;
import Offime.Offime.repository.member.MemberRepository;
import Offime.Offime.security.jwt.JwtTokenUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final UserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;


    // 회원가입
    public MemberResponseDto register(MemberRegisterDto memberRegisterDto){
        String encodedPassword = passwordEncoder.encode(memberRegisterDto.getPassword());
        memberRegisterDto.setPassword(encodedPassword);
        isExistUserEmail(memberRegisterDto.getEmail());
        Member saveMember = memberRepository.save(MemberRegisterDto.ofEntity(memberRegisterDto));
        return MemberResponseDto.fromEntity(saveMember);
    }

    private void isExistUserEmail(String email) {
        if (memberRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
    }

    // 로그인
    public MemberTokenDto login (MemberLoginDto memberLoginDto) {
        Member member = memberRepository.findByEmail(memberLoginDto.getEmail()).orElseThrow(
                () -> new ResourceNotFoundException("Member", "Member Email", memberLoginDto.getEmail()));
        authenticate(memberLoginDto.getEmail(), memberLoginDto.getPassword());
        String password = memberLoginDto.getPassword();
        if (passwordEncoder.matches(password, member.getPassword())) {
            String token = jwtTokenUtil.generateToken(member);
            return MemberTokenDto.fromEntity(member, token);
        } else {
            throw new IllegalArgumentException("잘못된 비밀번호 입니다.");
        }
    }

    private void authenticate(String email, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new MemberException("인증되지 않은 아이디입니다.", HttpStatus.BAD_REQUEST);
        } catch (BadCredentialsException e) {
            throw new MemberException("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 모든 직원 조회
    public Page<MemberResponseDto> getAllMembers(Pageable pageable) {
        return memberRepository.findAll(pageable).map(MemberResponseDto::fromEntity);
    }
}
