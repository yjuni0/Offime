package Offime.Offime.service.vacation;

import Offime.Offime.dto.request.vacation.ReqVacation;
import Offime.Offime.dto.response.vacation.ResVacation;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.vacation.Vacation;
import Offime.Offime.entity.vacation.VacationApprovalStatus;
import Offime.Offime.entity.vacation.VacationType;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class VacationMapper {
    public Vacation toEntity(Member member, ReqVacation reqVacation) {
        return Vacation.builder()
                .member(member)
                .type(VacationType.fromDescription(reqVacation.type()))
                .startDate(LocalDate.parse(reqVacation.startDate()))
                .endDate(LocalDate.parse(reqVacation.endDate()))
                .reason(reqVacation.reason())
                .status(VacationApprovalStatus.WAITING)
                .build();
    }
    public ResVacation fromEntity(Vacation vacation) {
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
