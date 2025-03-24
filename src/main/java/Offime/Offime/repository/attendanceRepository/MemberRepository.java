package Offime.Offime.repository.attendanceRepository;

import Offime.Offime.entity.attendanceEntity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long>{
}
