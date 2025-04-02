package Offime.Offime.repository.reports;

import Offime.Offime.entity.reports.TemplateAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemplateAccessRepository extends JpaRepository<TemplateAccess, Long> {
}
