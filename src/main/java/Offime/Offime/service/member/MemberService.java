package Offime.Offime.service.member;

import Offime.Offime.dto.request.member.MemberRegisterDto;
import Offime.Offime.dto.response.member.MemberResponseDto;
import Offime.Offime.entity.member.Member;
import Offime.Offime.repository.member.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

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
}
