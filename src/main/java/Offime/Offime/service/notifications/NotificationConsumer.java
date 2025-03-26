package Offime.Offime.service.notifications;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {

    private static final Logger logger = LoggerFactory.getLogger(NotificationConsumer.class);

    // 메시지 수신 및 처리
    @RabbitListener(queues = "notification")  // 큐 이름과 일치해야 함
    public void receiveMessage(String message) {
        logger.info("메시지 수신: {}", message);

        // 메시지 처리 로직을 여기에 추가
        // 예: 알림 저장, 로그 처리 등
    }
}
