package Offime.Offime.repository.reports;

import Offime.Offime.entity.reports.ResponseFiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseFilesRepository extends JpaRepository<ResponseFiles,Long> {
}
