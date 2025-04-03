package Offime.Offime.dto.response.vacation;

import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.vacation.Vacation;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record ResVacation(Long id, String type, LocalDate startDate, LocalDate endDate, String reason, String status,
                          String modifiedDate, String createdDate) {
}
