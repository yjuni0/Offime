package Offime.Offime.dto.response.vacation;

import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.vacation.Vacation;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ResVacation(Long id, Member member, String type, LocalDate startDate, LocalDate endDate, String reason, String status) {
    public static ResVacation fromEntity(Vacation vacation) {
       return ResVacation.builder()
                .id(vacation.getId())
                .member(vacation.getMember())
                .type(vacation.getType().getDescription())
                .startDate(vacation.getStartDate())
                .endDate(vacation.getEndDate())
                .reason(vacation.getReason())
                .status(vacation.getStatus().getDescription())
                .build();
    }
}
