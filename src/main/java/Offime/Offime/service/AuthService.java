//package Offime.Offime.service;
//
//import Offime.Offime.dto.request.RegisterRequest;
//import Offime.Offime.entity.Member;
//import Offime.Offime.repository.MemberRepository;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AuthService {
//
//    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//
//    // 회원가입 처리
//    public Member register(RegisterRequest request) {
//        logger.info("회원가입 요청 - 사용자 이름: {}, 비밀번호: {}", request.getUsername(), request.getPassword());
//
//        // 비밀번호 암호화
//        String encodedPassword = passwordEncoder.encode(request.getPassword());
//        logger.info("암호화된 비밀번호: {}", encodedPassword); // 이 로그를 추가합니다.
//
//        // 새로운 회원 객체 생성
//        Member member = new Member();
//        member.setUsername(request.getUsername());
//        member.setPassword(encodedPassword);
//
//        // 역할 설정
//        if (request.getRole() != null && !request.getRole().isEmpty()) {
//            member.setRole(request.getRole());
//        } else {
//            member.setRole("USER"); // 기본 역할 설정
//        }
//
//        // 회원 저장
//        return memberRepository.save(member);
//    }
//}