package Offime.Offime.dto.response.vacation;

import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.vacation.Vacation;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ResVacation(Long id, Member member, String type, LocalDate startDate, LocalDate endDate, String reason, String status) {

}
