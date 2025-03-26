package Offime.Offime.service.attendanceService;

import Offime.Offime.repository.attendanceRepository.EventRecordRepository;
import Offime.Offime.repository.attendanceRepository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class LeaderAttendanceManagerService {

    private final EventRecordRepository eventRecordRepository;
    private final MemberRepository memberRepository;

    private static final LocalTime COMPANY_START_TIME = LocalTime.of(9, 0);
    private static final LocalTime COMPANY_END_TIME = LocalTime.of(18, 0);


}
