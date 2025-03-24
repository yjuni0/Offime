package Offime.Offime.controller.member;

import Offime.Offime.dto.request.member.MemberLoginDto;
import Offime.Offime.dto.request.member.MemberRegisterDto;
import Offime.Offime.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> register(@RequestBody MemberRegisterDto memberRegisterDto){
        memberService.register(memberRegisterDto);
        return ResponseEntity.status(HttpStatus.OK).body("가입 완료");
    }
}
