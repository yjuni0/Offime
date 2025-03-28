package Offime.Offime.controller.member;

import Offime.Offime.dto.request.member.MemberLoginDto;
import Offime.Offime.dto.request.member.MemberRegisterDto;
import Offime.Offime.dto.response.member.MemberListDto;
import Offime.Offime.dto.response.member.MemberResponseDto;
import Offime.Offime.dto.response.member.MemberTokenDto;
import Offime.Offime.entity.member.Member;
import Offime.Offime.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원가입
    @PostMapping("/signUp")
    public ResponseEntity<String> register(@RequestBody MemberRegisterDto memberRegisterDto){
        memberService.register(memberRegisterDto);
        return ResponseEntity.status(HttpStatus.OK).body("가입 완료");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginDto memberLoginDto) {
        MemberTokenDto memberTokenDto = memberService.login(memberLoginDto);
            return ResponseEntity.status(HttpStatus.OK).header(memberTokenDto.getToken()).body(memberTokenDto);
    }


    // 모든 직원 조회
    @GetMapping("/member")
    public ResponseEntity<Page<MemberListDto>> getAllMembers(
            @PageableDefault(size= 10, sort="id", direction = Sort.Direction.ASC) Pageable pageable) {
        System.out.println("Received sort: " + pageable.getSort());
        Page<MemberListDto> memberListDtos = memberService.getAllMembers(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(memberListDtos);
    }

    // 탈퇴
    @GetMapping("/unable")
    public ResponseEntity<String> userUnable(@AuthenticationPrincipal Member member) {
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
        }

        if (member.isEnable()) {
            memberService.userDisabled(member);
            return ResponseEntity.status(HttpStatus.OK).body("유저 탈퇴 성공");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body("이미 탈퇴 상태입니다");
        }
    }

    // 직원 상세페이지
    @GetMapping("/member/{id}")
    public ResponseEntity<MemberResponseDto> getMemberDetail(@PathVariable Long id) {
        MemberResponseDto memberResponseDto = memberService.getMemberDetail(id);
        return ResponseEntity.status(HttpStatus.OK).body(memberResponseDto);
    }

}
