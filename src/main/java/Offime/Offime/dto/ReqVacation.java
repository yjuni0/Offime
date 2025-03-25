package Offime.Offime.dto;

import Offime.Offime.entity.Member;
import Offime.Offime.entity.Vacation;
import Offime.Offime.entity.VacationApprovalStatus;
import Offime.Offime.entity.VacationType;

import java.time.LocalDate;

public record ReqVacation(String type, String startDate, String endDate, String reason) {


    public static Vacation toEntity(Member member, ReqVacation reqVacation) {
        return Vacation.builder()
                .member(member)
                .type(VacationType.fromDescription(reqVacation.type))
                .startDate(LocalDate.parse(reqVacation.startDate()))
                .endDate(LocalDate.parse(reqVacation.endDate()))
                .reason(reqVacation.reason)
                .status(VacationApprovalStatus.WAITING)
                .build();
    }
}
