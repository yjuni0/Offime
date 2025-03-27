package Offime.Offime.controller.member;

import Offime.Offime.dto.response.member.MemberResponseDto;
import Offime.Offime.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final MemberService memberService;

    @GetMapping("/member")
    public ResponseEntity<Page<MemberResponseDto>> getAllMembers(
            @PageableDefault(size= 10, sort="id", direction = Sort.Direction.ASC) Pageable pageable) {
        System.out.println("Received sort: " + pageable.getSort());
        Page<MemberResponseDto> listDto = memberService.getAllMembers(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(listDto);
    }
}
