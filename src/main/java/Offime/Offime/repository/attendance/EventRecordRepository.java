package Offime.Offime.repository.attendance;

import Offime.Offime.entity.attendance.EventRecord;
import Offime.Offime.entity.attendance.EventType;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.member.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@Repository
public interface EventRecordRepository extends JpaRepository<EventRecord, Long> {

    Optional<EventRecord> findByMemberIdAndDateAndEventType(Long memberId, LocalDate date, EventType eventType);

    List<EventRecord> findByMemberAndDateBetween(Member member, LocalDate startDate, LocalDate endDate);

    List<EventRecord> findByDate(LocalDate date);

    long countByDateAndEventType(LocalDate date, EventType eventType);

    @Query("SELECT er FROM EventRecord er WHERE er.date = :date AND er.member.team = :team")
    List<EventRecord> findByDateAndTeam(@Param("date") LocalDate date, @Param("team") Team team);
}