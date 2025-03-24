package Offime.Offime.controller;

import Offime.Offime.dto.request.LoginRequest;
import Offime.Offime.dto.request.RegisterRequest;
import Offime.Offime.entity.Member;
import Offime.Offime.repository.MemberRepository;
import Offime.Offime.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AuthService authService;


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;  // BCryptPasswordEncoder 주입

    private static final String SECRET_KEY = System.getenv("JWT_SECRET_KEY");  // 비밀 키를 환경변수로 설정

    // 로그인 처리
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        Optional<Member> memberOptional = memberRepository.findByUsername(request.getUsername());

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            String storedPassword = member.getPassword();
            logger.info("로그인 시도 - 사용자 이름: {}, 입력 비밀번호: {}, 저장된 비밀번호: {}", request.getUsername(), request.getPassword(), storedPassword); // 이 로그를 추가합니다.

            if (passwordEncoder.matches(request.getPassword(), storedPassword)) {
                String token = generateToken(request.getUsername());
                return ResponseEntity.ok(token);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // JWT 토큰 생성 메서드
    private String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))  // 24시간 유효
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // JWT 토큰 검증 메서드
    private Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    // 회원가입 처리
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        try {
            Member member = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패");
        }
    }
}
