package Offime.Offime.repository.member;

import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.reports.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
}
