package Offime.Offime.config.rabbitMQ;


import Offime.Offime.entity.notifications.NotificationMessage;
import Offime.Offime.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Configuration;



@Slf4j
@Configuration
@RequiredArgsConstructor
public class MessageConsumer {
    private final NotificationService notificationService; // NotificationService 주입

    // 휴가 관련 메시지 수신
    @RabbitListener(queues = RabbitConfig.VACATION_QUEUE)
    public void handleVacationMessage(NotificationMessage notificationMessage) {
        Long memberId = notificationMessage.getMemberId();
        String message = notificationMessage.getMessage();
        // 회원에게 알림 전송
        notificationService.sendNotification(memberId, message);

        log.info("휴가 관련 메시지 : {}",  message);
    }

    // 비용 관련 메시지 수신
    @RabbitListener(queues = RabbitConfig.COST_QUEUE)
    public void handleCostMessage(String message) {
        log.info("비용 관련 메시지 : {}",  message);
    }

}