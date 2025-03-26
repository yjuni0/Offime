package Offime.Offime.repository.attendanceRepository;

import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.entity.attendanceEntity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EventRecordRepository extends JpaRepository<EventRecord, Long> {

    Optional<EventRecord> findByDateAndEventType(LocalDate date, EventType eventType);
    List<EventRecord> findByDateBetween(LocalDate startDate, LocalDate endDate);
    List<EventRecord> findByDate(LocalDate date);
}
