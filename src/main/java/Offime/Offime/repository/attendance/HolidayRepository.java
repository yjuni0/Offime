package Offime.Offime.repository.attendance;

import Offime.Offime.entity.attendance.HolidayEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HolidayRepository extends JpaRepository<HolidayEntity, String> {
}