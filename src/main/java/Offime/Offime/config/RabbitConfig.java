//package Offime.Offime.config;
//
//import org.springframework.amqp.core.Binding;
//import org.springframework.amqp.core.BindingBuilder;
//import org.springframework.amqp.core.Queue;
//import org.springframework.amqp.core.TopicExchange;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//@Configuration
//public class RabbitConfig {
//    public static final String EXCHANGE_NAME = "notificationExchange";  // 교환기 이름
//    public static final String QUEUE_NAME = "notificationQueue";        // 큐 이름
//
//    // 큐를 생성합니다.
//    @Bean
//    public Queue notificationQueue() {
//        return new Queue(QUEUE_NAME, true);  // 큐 이름과 지속성 설정
//    }
//
//    // TopicExchange를 생성합니다.
//    @Bean
//    public TopicExchange notificationExchange() {
//        return new TopicExchange(EXCHANGE_NAME, true, true); // 교환기 이름, 지속성, 내구성 설정
//    }
//
//    // 큐와 Exchange를 바인딩합니다.
//    @Bean
//    public Binding binding(Queue notificationQueue, TopicExchange notificationExchange) {
//        return BindingBuilder.bind(notificationQueue)
//                .to(notificationExchange)
//                .with("notification.*"); // 라우팅 키 패턴 설정 (예: notification.*로 시작하는 메시지)
//    }
//}