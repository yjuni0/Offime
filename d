[1mdiff --git a/src/main/java/Offime/Offime/config/SecurityConfig.java~ b/src/main/java/Offime/Offime/config/SecurityConfig.java~[m
[1mdeleted file mode 100644[m
[1mindex e74f5c3..0000000[m
[1m--- a/src/main/java/Offime/Offime/config/SecurityConfig.java~[m
[1m+++ /dev/null[m
[36m@@ -1,64 +0,0 @@[m
[31m-package Offime.Offime.config;[m
[31m-[m
[31m-import Offime.Offime.security.jwt.JwtAuthenticationEntryPoint;[m
[31m-import Offime.Offime.security.jwt.JwtAuthenticationFilter;[m
[31m-import lombok.RequiredArgsConstructor;[m
[31m-import org.springframework.context.annotation.Bean;[m
[31m-import org.springframework.context.annotation.Configuration;[m
[31m-import org.springframework.security.authentication.AuthenticationManager;[m
[31m-import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;[m
[31m-import org.springframework.security.config.annotation.web.builders.HttpSecurity;[m
[31m-import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;[m
[31m-import org.springframework.security.config.http.SessionCreationPolicy;[m
[31m-import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;[m
[31m-import org.springframework.security.crypto.password.PasswordEncoder;[m
[31m-import org.springframework.security.web.SecurityFilterChain;[m
[31m-import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;[m
[31m-import org.springframework.web.cors.CorsConfigurationSource;[m
[31m-[m
[31m-@Configuration[m
[31m-@EnableWebSecurity[m
[31m-@RequiredArgsConstructor[m
[31m-public class SecurityConfig {[m
[31m-[m
[31m-    private final CorsConfigurationSource corsConfigurationSource;[m
[31m-    private final JwtAuthenticationFilter jwtAuthenticationFilter;[m
[31m-    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;[m
[31m-[m
[31m-    // 비밀번호 암호화 - Bean 설정[m
[31m-    @Bean[m
[31m-    PasswordEncoder passwordEncoder() {[m
[31m-        return new BCryptPasswordEncoder();[m
[31m-    }[m
[31m-[m
[31m-    // 사용자 인증 요청 처리 - Bean 설정[m
[31m-    @Bean[m
[31m-    public AuthenticationManager authenticationManager([m
[31m-            AuthenticationConfiguration authenticationConfiguration) throws Exception {[m
[31m-        return authenticationConfiguration.getAuthenticationManager();[m
[31m-    }[m
[31m-[m
[31m-    // HttpSecurity 보안 설정,  Jwt 인증을 사용할 때 사용[m
[31m-    @Bean[m
[31m-    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {[m
[31m-        return http[m
[31m-                .httpBasic(httpBasic -> httpBasic.disable())[m
[31m-                .csrf(csrf -> csrf.disable())[m
[31m-                .cors(cors -> cors.configurationSource(corsConfigurationSource))[m
[31m-[m
[31m-                .authorizeHttpRequests(authorize[m
[31m-                        -> authorize[m
[31m-                        .requestMatchers([m
[31m-                                "/signUp",[m
[31m-                                "/login"[m
[31m-                        ).permitAll()[m
[31m-                        .anyRequest().authenticated()  // 나머지 모든 요청은 인증 필요[m
[31m-                )[m
[31m-[m
[31m-[m
[31m-                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))[m
[31m-                .exceptionHandling(excep -> excep.authenticationEntryPoint(jwtAuthenticationEntryPoint))[m
[31m-                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)[m
[31m-                .build();[m
[31m-    }[m
[31m-}[m
