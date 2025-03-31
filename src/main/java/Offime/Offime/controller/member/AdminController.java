package Offime.Offime.controller.member;

import Offime.Offime.dto.response.member.MemberPendingDto;
import Offime.Offime.dto.response.member.MemberResponseDto;
import Offime.Offime.entity.member.SignUpStatus;
import Offime.Offime.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final MemberService memberService;

    // 직원 삭제
    @DeleteMapping("/delete/{memberId}")
    public ResponseEntity<String> deleteMember(@PathVariable Long memberId) {
        memberService.deleteMember(memberId);
        return ResponseEntity.status(HttpStatus.OK).body("유저 삭제 성공");
    }

    // 가입 신청자 조회
    @GetMapping("/member/signUpStatus")
    public ResponseEntity<List<MemberPendingDto>> getMembersBySignUpStatus() {
        List<MemberPendingDto> members = memberService.getPendingMembers();
        return ResponseEntity.status(HttpStatus.OK).body(members);
    }

    // 가입 승인
    @PutMapping("/member/updateSignUpStatus")
    public ResponseEntity<Void> updateSignUpStatus(@RequestParam String email) {
        memberService.updateSignUpStatusToActive(email);
        return ResponseEntity.ok().build();
    }
}
