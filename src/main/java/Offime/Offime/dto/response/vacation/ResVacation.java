package Offime.Offime.dto.response.vacation;

import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.vacation.Vacation;
import lombok.Builder;

import java.time.LocalDate;
<<<<<<< HEAD
import java.time.LocalDateTime;

@Builder
public record ResVacation(Long id, String type, LocalDate startDate, LocalDate endDate, String reason, String status,
                          String modifiedDate, String createdDate) {
=======

@Builder
public record ResVacation(Long id, String type, LocalDate startDate, LocalDate endDate, String reason, String status) {
>>>>>>> 3b1e12d85a949549e516839c8699a7ce43a6a5d6
}
