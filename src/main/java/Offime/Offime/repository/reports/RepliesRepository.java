package Offime.Offime.repository.reports;

import Offime.Offime.entity.reports.Replies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepliesRepository extends JpaRepository<Replies,Long> {
}
