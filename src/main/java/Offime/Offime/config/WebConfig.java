package Offime.Offime.config;

import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // 파일 크기 설정 (필요에 따라 수정)
        factory.setMaxFileSize(DataSize.parse("10MB"));
        factory.setMaxRequestSize(DataSize.parse("10MB"));
        return factory.createMultipartConfig();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // CORS를 적용할 URL 패턴 (여기서는 /api/로 시작하는 모든 엔드포인트)
                .allowedOrigins("http://localhost:3000") // 허용할 Origin (프론트엔드 주소)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                .allowedHeaders("*") // 허용할 모든 헤더
                .allowCredentials(true) // 쿠키 인증 정보를 서버로 보낼 수 있도록 허용 (필요한 경우 true로 설정)
                .maxAge(3600); // Preflight 요청에 대한 응답을 3600초 (1시간) 동안 캐싱
    }
}