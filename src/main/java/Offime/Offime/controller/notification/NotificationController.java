package Offime.Offime.controller.notification;

import Offime.Offime.config.rabbitMQ.NotificationService;
import Offime.Offime.entity.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;


    @GetMapping("/notifications")
    public SseEmitter listenNotifications(@AuthenticationPrincipal Member member) {
        Long memberId = member.getId();
        return notificationService.listenToNotifications(memberId);
    }
}
