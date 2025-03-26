package Offime.Offime.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Value("${jwt.secret}") // @Value 어노테이션 사용
    private String secretKey;

    @Autowired
    private UserDetailsService userDetailsService;

    public JwtAuthenticationFilter() {
        logger.info("JwtAuthenticationFilter 생성됨, SECRET_KEY: {}", secretKey); // secretKey 변수 사용
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");
        logger.info("Authorization Header: {}", authorizationHeader);

        if (secretKey == null || secretKey.isEmpty()) { // secretKey 변수 사용
            logger.error("SECRET_KEY가 설정되지 않음!");
            filterChain.doFilter(request, response);
            return;
        }

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // "Bearer " 제거
            logger.info("JWT Token: {}", token);

            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(secretKey) // secretKey 변수 사용
                        .parseClaimsJws(token)
                        .getBody();

                String username = claims.getSubject();
                logger.info("JWT 검증 성공, username: {}", username);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    logger.info("SecurityContext에 사용자 등록: {}", username);
                }
            } catch (Exception e) {
                logger.error("JWT 토큰 검증 실패: {}", e.getMessage());
            }
        } else {
            logger.warn("Authorization 헤더가 없거나 형식이 올바르지 않음");
        }

        filterChain.doFilter(request, response);
    }
}