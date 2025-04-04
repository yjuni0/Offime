package Offime.Offime.config.rabbitMQ;

import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.notifications.NotificationMessage;
import Offime.Offime.repository.notification.NotificationMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationMessageRepository notificationMessageRepository;

    public List<NotificationMessage> getAll(Member member) {
        Long memberId = member.getId();
        List<NotificationMessage> list = notificationMessageRepository.findAllByMemberId(memberId);
        return list;
    }

}
