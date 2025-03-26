package Offime.Offime.repository.attendanceRepository;

import Offime.Offime.entity.attendanceEntity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
}