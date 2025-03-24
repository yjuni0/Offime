package Offime.Offime.repository.attendanceRepository;


import Offime.Offime.entity.attendanceEntity.EventRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRecordRepository extends JpaRepository<EventRecord, Long> {
}
