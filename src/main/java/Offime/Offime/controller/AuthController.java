package Offime.Offime.controller;

import Offime.Offime.dto.request.LoginRequest;
import Offime.Offime.dto.request.RegisterRequest;
import Offime.Offime.entity.Member;
import Offime.Offime.repository.MemberRepository;
import Offime.Offime.service.AuthService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;  // BCryptPasswordEncoder 주입

    @Value("${jwt.secret}")
    private String secretKey;

    // 로그인 처리
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        Optional<Member> memberOptional = memberRepository.findByUsername(request.getUsername());

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            String storedPassword = member.getPassword();
            logger.info("로그인 시도 - 사용자 이름: {}, 입력 비밀번호: {}, 저장된 비밀번호: {}", request.getUsername(), request.getPassword(), storedPassword); // 로그 추가

            if (passwordEncoder.matches(request.getPassword(), storedPassword)) {
                String token = generateToken(request.getUsername());
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                return ResponseEntity.ok(response);  // 토큰을 JSON 형태로 반환
            } else {
                logger.warn("비밀번호 불일치 - 사용자 이름: {}", request.getUsername());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<String, String>() {{
                    put("message", "Invalid credentials");
                }});
            }
        } else {
            logger.warn("사용자 이름 미존재 - {}", request.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<String, String>() {{
                put("message", "Invalid credentials");
            }});
        }
    }

    // JWT 토큰 생성 메서드
    private String generateToken(String username) {
        Optional<Member> memberOptional = memberRepository.findByUsername(username);
        String role = memberOptional.map(Member::getRole).orElse("USER"); // 사용자 정보를 통해 role 획득

        logger.info("토큰 생성 - 사용자 이름: {}, role: {}", username, role);  // 토큰 생성 로그

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)  // role을 JWT에 추가
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))  // 24시간 유효
                .signWith(SignatureAlgorithm.HS256, secretKey)  // application.properties에서 불러온 비밀 키 사용
                .compact();
    }

    // JWT 토큰 검증 메서드
    private Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)  // application.properties에서 불러온 비밀 키 사용
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
            logger.error("회원가입 실패 - 오류: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패");
        }
    }
}