//package Offime.Offime.config.rabbitMQ;
//
//import org.springframework.scheduling.annotation.Async;
//import org.springframework.stereotype.Service;
//import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
//import java.io.IOException;
//import java.util.Map;
//import java.util.concurrent.CompletableFuture;
//import java.util.concurrent.ConcurrentHashMap;
//
//@Service
//public class SseService {
//
//    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();
//
//    // 클라이언트 연결을 위한 메서드
//    public SseEmitter subToNotifications(Long memberId) {
//        SseEmitter emitter = new SseEmitter(60_000L);
//        emitters.put(memberId, emitter);
//        emitter.onCompletion(() -> emitters.remove(memberId));  // 연결 종료 시 처리
//        emitter.onTimeout(() -> emitters.remove(memberId));      // 타임아웃 시 처리
//        return emitter;
//    }
//
//    @Async
//    public CompletableFuture<Void> sendNotificationAsync(Long memberId, String notification) {
//        SseEmitter emitter = emitters.get(memberId);
//        if (emitter != null) {
//            try {
//                emitter.send(notification);  // 클라이언트에게 알림 전송
//            } catch (IOException e) {
//                emitter.completeWithError(e);  // 전송 중 오류 발생 시
//            }
//        }
//        return CompletableFuture.completedFuture(null);
//    }
//}
