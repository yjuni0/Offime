package Offime.Offime.repository.reports;

import Offime.Offime.entity.reports.Responses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponsesRepository extends JpaRepository<Responses,Long> {
}
