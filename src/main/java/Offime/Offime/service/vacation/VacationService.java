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
import java.time.LocalDate;
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
    @Transactional
    public Page<ResVacation> getAllVacations(Member member, Pageable pageable) {
        log.info("요청 멤버{} 페이징{} : ", member.getId(),pageable);
        Page<Vacation> vacations = vacationRepository.findAllByMember(member,pageable);
        List<ResVacation> list = vacations.stream().map(vacationMapper::fromEntity).toList();
        log.info("해당 멤버 {} 가 신청한 휴가 {}",member.getId(),list.size());

        return new PageImpl<>(list,pageable,list.size());
    }
    @Transactional
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
    @Transactional
    public ResVacation applyVacation(Member member, ReqVacation reqVacation) {
        // 1. 이메일로 멤버 찾기
        Member reqMember = memberRepository.findByEmail(member.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("없어"));

        // 2. 신청된 휴가의 시작일과 종료일을 받아옴
        LocalDate startDate = reqVacation.startDate();
        LocalDate endDate = reqVacation.endDate();
        boolean existApplyVacation = vacationRepository.existsVacationOverlap(startDate,endDate,reqMember);
        if(existApplyVacation){
            throw new VacationException("중복 날짜는 휴가 신청이 불가능");
        }
        // 4. 휴가 신청 처리
        Vacation vacation = vacationMapper.toEntity(reqMember, reqVacation);
        vacationRepository.save(vacation);

        // 5. 알림 전송
        String message = "새로운 휴가 신청이 있습니다: " + vacation.getReason() + " (" + vacation.getStartDate() + " ~ " + vacation.getEndDate() + ")";
        notificationProducer.sendMessage(message);  // 알림 전송

        return vacationMapper.fromEntity(vacation);
    }
    // 승인 반려
    @Transactional
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
    @Transactional
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
    @Transactional
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

