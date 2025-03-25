package Offime.Offime.dto.request.vacation;

import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.vacation.Vacation;
import Offime.Offime.entity.vacation.VacationApprovalStatus;
import Offime.Offime.entity.vacation.VacationType;

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
