package Offime.Offime.service.notifications;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationProducer {

    private static final Logger logger = LoggerFactory.getLogger(NotificationProducer.class);

    // Exchange 이름과 Routing Key를 상수로 관리
    private static final String EXCHANGE_NAME = "notificationExchange";
    private static final String ROUTING_KEY = "notification.routing.key";

    @Autowired
    private AmqpTemplate amqpTemplate;

    // 메시지 전송
    public void sendMessage(String message) {
        try {
            // 메시지 전송
            amqpTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, message);
            logger.info("메시지 전송 완료: {}", message);
        } catch (Exception e) {
            logger.error("메시지 전송 실패: ", e);
        }
    }
}