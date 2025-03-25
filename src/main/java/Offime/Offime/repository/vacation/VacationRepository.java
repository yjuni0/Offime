package Offime.Offime.repository.vacation;

import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.vacation.Vacation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacationRepository extends JpaRepository<Vacation, Long> {
    Page<Vacation> findAllByMember(Member member, Pageable pageable);

    Vacation findByMemberAndId(Member member, Long id);
}
