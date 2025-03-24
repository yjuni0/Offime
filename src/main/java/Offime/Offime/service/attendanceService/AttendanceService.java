package Offime.Offime.service.attendanceService;


import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.repository.attendanceRepository.EventRecordRepository;
import Offime.Offime.repository.attendanceRepository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static Offime.Offime.entity.attendanceEntity.EventRecord.EventType.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final EventRecordRepository eventRecordRepository;
    private final MemberRepository memberRepository;

    private static final double EARTH_RADIUS = 6371.0088;       // 지구 평균 반지름(km)
    private static final double COMPANY_LATITUDE = 37.482175;   // 구트 아카데미 위도
    private static final double COMPANY_LONGITUDE = 126.898233; // 구트 아카데미 경도
    private static final int MAX_DISTANCE = 50;                 // 허용할 최대 거리(m)

    public void makeEvent(LocalDateTime time, EventRecord.EventType eventType, double latitude, double longitude) {
        EventRecord eventRecord = new EventRecord();
        eventRecord.setDate(time.toLocalDate());
        eventRecord.setEventType(eventType);

        if (eventType == 출근 || eventType == 복귀) {
            if (!isInAllowedDistance(latitude, longitude)) {
                throw new IllegalArgumentException(eventType + "위치 체크 실패: 허용 범위를 벗어났습니다.");
            }
            eventRecord.setEventRequestTime(time);
        }
        eventRecordRepository.save(eventRecord);
    }

    public void clockOut(LocalDateTime time, EventRecord.EventType eventType){
        EventRecord eventRecord = new EventRecord();
        eventRecord.setDate(time.toLocalDate());
        eventRecord.setEventRequestTime(time);
        eventRecord.setEventType(퇴근);
        eventRecord.setEventRequestTime(time);
        eventRecordRepository.save(eventRecord);
    }
    //private 메소드=========================================================================================

    private boolean isInAllowedDistance(double latitude, double longitude) {
        double distance = calculateDistance(COMPANY_LATITUDE, COMPANY_LONGITUDE, latitude, longitude);
        return distance <= MAX_DISTANCE;
    }

    // 하버사인 공식 - 구면 위 두 개의 좌표(위도, 경도) 사이의 거리를 구하는 메소드
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        // 위도와 경도 차이를 라디안으로 변환
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        // 하버사인 공식 적용
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        // 중심각 계산
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // 최종 거리 계산
        double distance = EARTH_RADIUS * c * 1000; // 미터로 변환
        log.info("거리 : "  + String.format("%.3f", distance) + "미터.");
        return distance;
    }
}
