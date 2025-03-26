package Offime.Offime.repository.reports;

import Offime.Offime.entity.reports.Questions;
import Offime.Offime.entity.reports.Responses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponsesRepository extends JpaRepository<Responses,Long> {
    List<Responses> findAllByQuestion(Questions question);
}
