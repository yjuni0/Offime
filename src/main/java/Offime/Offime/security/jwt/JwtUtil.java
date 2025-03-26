package Offime.Offime.security.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component // 스프링 빈으로 등록
public class JwtUtil {

    private static final String SECRET_KEY = System.getenv("JWT_SECRET_KEY"); // 환경 변수에서 비밀 키 읽기

    // JWT 토큰에서 사용자 정보 추출
    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY) // 환경변수로 불러온 비밀 키 사용
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // JWT 토큰에서 role 정보 추출
    public String extractRole(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY) // 환경변수로 불러온 비밀 키 사용
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class); // role claim 추출
    }

    // JWT 토큰이 유효한지 검사
    public boolean isTokenExpired(String token) {
        try {
            Date expirationDate = Jwts.parser()
                    .setSigningKey(SECRET_KEY) // 환경변수로 불러온 비밀 키 사용
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration();
            return expirationDate.before(new Date());
        } catch (Exception e) {
            return true; // 토큰 파싱 실패 시 만료된 것으로 간주 (보안 목적)
        }
    }
}
