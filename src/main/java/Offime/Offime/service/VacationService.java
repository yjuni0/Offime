package Offime.Offime.service;

import Offime.Offime.dto.ReqVacation;
import Offime.Offime.dto.ResVacation;
import Offime.Offime.entity.Member;
import Offime.Offime.entity.Vacation;
import Offime.Offime.entity.VacationApprovalStatus;
import Offime.Offime.repository.MemberRepository;
import Offime.Offime.repository.VacationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class VacationService {
    private final VacationRepository vacationRepository;
    private final MemberRepository memberRepository;
    // 조회
    public Page<ResVacation> getAllVacations(Member member, Pageable pageable) {
        log.info("요청 멤버{} 페이징{} : ", member.getId(),pageable);
        Page<Vacation> vacations = vacationRepository.findAllByMember(member,pageable);
        List<ResVacation> list = vacations.stream().map(ResVacation::fromEntity).toList();
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
        return ResVacation.fromEntity(vacation);
    }

    // 신청
    public ResVacation applyVacation(Member member, ReqVacation reqVacation) {
        log.info("휴가 신청 멤버 id {} 요청 데이터 : {} ", member.getId(),reqVacation);
        Vacation vacation = ReqVacation.toEntity(member, reqVacation);
        vacationRepository.save(vacation);
        log.info("휴가 신청 성공 멤버{} , 휴가 id{} ",member.getId(),vacation.getId());
        return ResVacation.fromEntity(vacation);
    }

    // 승인 반려
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

