package Offime.Offime.repository.vacation;

import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.vacation.Vacation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
<<<<<<< HEAD
import java.util.List;

@Repository
public interface VacationRepository extends JpaRepository<Vacation, Long> {
    Page<Vacation> findAllByMember(Member member,Pageable pageable);
=======

@Repository
public interface VacationRepository extends JpaRepository<Vacation, Long> {
    Page<Vacation> findAllByMember(Member member, Pageable pageable);
>>>>>>> 3b1e12d85a949549e516839c8699a7ce43a6a5d6

    Vacation findByMemberAndId(Member member, Long id);

    @Query("SELECT COUNT(v) > 0 FROM Vacation v WHERE v.member = :member " +
            "AND ((v.startDate <= :endDate AND v.endDate >= :startDate))")
    boolean existsVacationOverlap(@Param("startDate") LocalDate startDate,
                                  @Param("endDate") LocalDate endDate,
                                  @Param("member") Member member);

<<<<<<< HEAD
    List<Vacation> findTop5ByMemberOrderByIdDesc(Member member);
=======
>>>>>>> 3b1e12d85a949549e516839c8699a7ce43a6a5d6
}
