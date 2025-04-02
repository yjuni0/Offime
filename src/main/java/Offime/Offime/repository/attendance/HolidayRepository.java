//package Offime.Offime.repository.attendance;
//
//import java.time.LocalDate;
//import java.util.HashSet;
//import java.util.Set;
//
//public interface HolidayRepository {
//
//    // 예시: 공휴일 데이터를 하드코딩 (실제 구현에서는 DB 또는 외부 API 연동)
//    private static final Set<LocalDate> HOLIDAYS = Set.of(
//            LocalDate.of(2025, 4, 3),
//            LocalDate.of(2025, 4, 15)
//    );
//
//    public Set<LocalDate> findHolidaysBetween(LocalDate start, LocalDate end) {
//        Set<LocalDate> result = new HashSet<>();
//        for (LocalDate holiday : HOLIDAYS) {
//            if (!holiday.isBefore(start) && !holiday.isAfter(end)) {
//                result.add(holiday);
//            }
//        }
//        return result;
//    }
//}
