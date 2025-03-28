package Offime.Offime.repository.notification;

import Offime.Offime.entity.notifications.NotificationMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationMessageRepository extends JpaRepository<NotificationMessage, Long> {
    boolean existsByMemberId(Long memberId);

    List<NotificationMessage> findAllByMemberId(Long memberId);
}
