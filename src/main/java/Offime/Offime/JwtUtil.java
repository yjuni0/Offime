package Offime.Offime;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class JwtUtil {

    private final String secretKey = "yourSecretKey"; // 비밀 키

    // JWT 토큰 생성
    public String createToken(String username) {
        return Jwts.builder()
                .setSubject(username) // 사용자 정보
                .setIssuedAt(new Date()) // 발행 시간
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 만료 시간 (1시간)
                .signWith(SignatureAlgorithm.HS256, secretKey) // 서명 알고리즘 및 비밀 키
                .compact();
    }

    // JWT 토큰에서 정보 추출
    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
