package Offime.Offime.repository;

import Offime.Offime.dto.ResVacation;
import Offime.Offime.entity.Member;
import Offime.Offime.entity.Vacation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacationRepository extends JpaRepository<Vacation, Long> {
    Page<Vacation> findAllByMember(Member member, Pageable pageable);

    Vacation findByMemberAndId(Member member, Long id);
}
