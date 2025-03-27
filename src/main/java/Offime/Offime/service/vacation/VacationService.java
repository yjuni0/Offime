package Offime.Offime.service.vacation;

import Offime.Offime.common.Role;
import Offime.Offime.dto.request.vacation.ReqVacation;
import Offime.Offime.dto.response.vacation.ResVacation;
import Offime.Offime.entity.member.Member;
import Offime.Offime.entity.vacation.Vacation;
import Offime.Offime.entity.vacation.VacationApprovalStatus;
import Offime.Offime.exception.VacationException;
import Offime.Offime.repository.member.MemberRepository;
import Offime.Offime.repository.vacation.VacationRepository;
import Offime.Offime.service.notifications.NotificationProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class VacationService {
    private final VacationRepository vacationRepository;
    private final VacationMapper vacationMapper;
    private final NotificationProducer notificationProducer;
    private final MemberRepository memberRepository;
    // 조회
    public Page<ResVacation> getAllVacations(Member member, Pageable pageable) {
        log.info("요청 멤버{} 페이징{} : ", member.getId(),pageable);
        Page<Vacation> vacations = vacationRepository.findAllByMember(member,pageable);
        List<ResVacation> list = vacations.stream().map(vacationMapper::fromEntity).toList();
        log.info("해당 멤버 {} 가 신청한 휴가 {}",member.getId(),list.size());

        return new PageImpl<>(list,pageable,list.size());
    }

    public ResVacation getVacationById(Member member,Long id) {
        Vacation vacation = vacationRepository.findByMemberAndId(member,id);
        log.info("요청 멤버{} 휴가 id {} : ", member.getId(),id);
        if (vacation==null || !vacation.getMember().getId().equals(member.getId())) {
            log.error("요청 휴가 id {}를 찾을 수 없음 또는  멤버 id가 다름 {}",id,member.getId());
            throw new IllegalArgumentException("해당 멤버만 조회 가능 "+member.getId());
        }
        log.info("요청 휴가 {} 멤버 id {} ",id,member.getId());
        return vacationMapper.fromEntity(vacation);
    }

    // 신청
    public ResVacation applyVacation(Member member, ReqVacation reqVacation) {
        if (vacationRepository.existsVacationOverlap(reqVacation.startDate(),reqVacation.endDate(),member)){
            throw new VacationException("중복된 기간 휴가 신청은 불가.");
        }
        log.info("휴가 신청 멤버 id {} 요청 데이터 : {} ", member.getId(),reqVacation);
        Vacation vacation = vacationMapper.toEntity(member, reqVacation);
        vacationRepository.save(vacation);
        log.info("휴가 신청 성공 멤버{} , 휴가 id{} ",member.getId(),vacation.getId());
        // 2. 휴가 신청 후 알림 전송 (RabbitMQ)
        String message = "새로운 휴가 신청이 있습니다: " + vacation.getReason() + " (" + vacation.getStartDate() + " ~ " + vacation.getEndDate() + ")";
        notificationProducer.sendMessage(message);  // 알림 전송
        return vacationMapper.fromEntity(vacation);
    }

    // 승인 반려
    public String approveVacation(Member member, Long vacationId) {
        try {
            if (member.getRole().equals(Role.ADMIN)) {
                // 휴가 조회
                Vacation vacation = vacationRepository.findById(vacationId)
                        .orElseThrow(() -> new IllegalArgumentException("해당 신청 휴가 없음"));

                BigDecimal availableDays = vacation.getMember().getAvailableLeaveDays();
                BigDecimal useDays = switch (vacation.getType()) {
                    case FULL -> new BigDecimal("1.00");
                    case HALF -> new BigDecimal("0.50");
                    case QUATER -> new BigDecimal("0.25");
                    default -> throw new IllegalArgumentException("알 수 없는 휴가 유형");
                };

                // 잔여 연차가 충분한지 체크
                if (availableDays.compareTo(useDays) < 0) {
                    return "잔여 연차가 부족합니다.";
                }

                // 연차 차감
                vacation.getMember().setAvailableLeaveDays(availableDays.subtract(useDays));
                // 승인 처리
                vacation.setStatus(VacationApprovalStatus.APPROVED);
                vacationRepository.save(vacation); // 변경 사항 저장
                log.info("휴가 id {} 승인 처리됨", vacationId);
            }
            return "승인 완료";
        } catch (IllegalArgumentException iae) {
            log.error("휴가 조회 실패: ", iae);
            throw new IllegalArgumentException("휴가 조회 실패");
        } catch (Exception e) {
            log.error("서버 오류 발생: ", e);
            throw new RuntimeException("서버 오류 발생");
        }
    }
    public String rejectVacation(Member member, Long vacationId) {
        try {
            if (member.getRole().equals(Role.ADMIN)) {
                Vacation vacation = vacationRepository.findById(vacationId).orElseThrow(() -> new IllegalArgumentException("해당 신청 휴가 없음"));
                vacation.setStatus(VacationApprovalStatus.REJECTED);
                vacationRepository.save(vacation);
                log.info("휴가 id {} 반려 처리됨", vacationId);
            }else {
                throw new IllegalArgumentException("관리자만 가능");
            }
            return "휴가 반려";
        }catch (IllegalArgumentException iae) {
            log.error("휴가 조회 실패");
            throw new IllegalArgumentException("휴가 조회 실패 ");
        }catch (Exception e) {
            log.error("서버 오류 발생",e);
            throw new RuntimeException("서버 오류 발생");
        }

    }

    // 취소 ( 삭제 )
    public void deleteVacation(Member member,Long id){
        log.info("휴가 삭제 요청 id {} 멤버 id : {}",id,member.getId());
        Vacation vacation = vacationRepository.findByMemberAndId(member,id);
        if (vacation==null || !vacation.getMember().getId().equals(member.getId())) {
            log.error("요청 휴가 id {}를 찾을 수 없음 또는  멤버 id가 다름 {}",id,member.getId());
            throw new IllegalArgumentException("해당 멤버만 삭제 가능"+member.getId());
        }
        vacationRepository.delete(vacation);
        log.info("휴가 삭제 {} 멤버id {}",id,member.getId());
    }
}

