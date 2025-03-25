package Offime.Offime.controller.member;

import Offime.Offime.dto.request.member.MemberLoginDto;
import Offime.Offime.dto.request.member.MemberRegisterDto;
import Offime.Offime.dto.response.member.MemberTokenDto;
import Offime.Offime.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody MemberRegisterDto memberRegisterDto){
        memberService.register(memberRegisterDto);
        return ResponseEntity.status(HttpStatus.OK).body("가입 완료");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginDto memberLoginDto) {
        MemberTokenDto memberTokenDto = memberService.login(memberLoginDto);
        if (memberTokenDto.isEnabled()) {
            return ResponseEntity.status(HttpStatus.OK).header(memberTokenDto.getToken()).body(memberTokenDto);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: 탈퇴한 회원입니다.");
        }
    }


}
