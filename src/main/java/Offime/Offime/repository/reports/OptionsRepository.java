package Offime.Offime.repository.reports;

import Offime.Offime.entity.reports.Options;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionsRepository extends JpaRepository<Options,Long> {
}
