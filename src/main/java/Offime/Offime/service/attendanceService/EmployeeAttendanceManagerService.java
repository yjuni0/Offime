//package Offime.Offime.service.attendanceService;
//
//import Offime.Offime.entity.attendanceEntity.EventRecord;
//import Offime.Offime.repository.attendanceRepository.EventRecordRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class EmployeeAttendanceManagerService {
//
//    private final EventRecordRepository eventRecordRepository;
//
//    public WeeklyAttendanceStats getWeeklyAttendanceStats(LocalDate startDate) {
//        LocalDate endDate = startDate.plusDays(6);
//        List<EventRecord> records = eventRecordRepository.findByDateBetween(startDate, endDate);
//        return calculateAttendanceStats(records);
//    }
//
//    public MonthlyAttendanceStats getMonthlyAttendanceStats(int year, int month) {
//        LocalDate startDate = LocalDate.of(year, month, 1);
//        LocalDate endDate = startDate.plusMonths(1).minusDays(1);
//        List<EventRecord> records = eventRecordRepository.findByDateBetween(startDate, endDate);
//        return calculateAttendanceStats(records);
//    }
//
//    private AttendanceStats calculateAttendanceStats(List<EventRecord> records) {
//        long clockInCount = records.stream().filter(r -> r.getEventType() == EventType.출근).count();
//        long lateCount = records.stream().filter(r -> r.getLate() > 0).count();
//        long totalLateMinutes = records.stream().mapToLong(EventRecord::getLate).sum();
//        long leaveEarlyCount = records.stream().filter(r -> r.getLeaveEarly() > 0).count();
//        long totalLeaveEarlyMinutes = records.stream().mapToLong(EventRecord::getLeaveEarly).sum();
//
//        return new AttendanceStats(clockInCount, lateCount, totalLateMinutes, leaveEarlyCount, totalLeaveEarlyMinutes);
//    }
//
//
////    public List<EventRecord> getDailyRecords(LocalDate date) {
////        return eventRecordRepository.findByDate(date);
////    }
////
////    public List<EventRecord> getWeeklyRecords(LocalDate startOfWeek) {
////        LocalDate endOfWeek = startOfWeek.plusDays(6);
////        return eventRecordRepository.findByDateBetween(startOfWeek, endOfWeek);
////    }
////
////    public List<EventRecord> getMonthlyRecords(int year, int month) {
////        LocalDate startOfMonth = LocalDate.of(year, month, 1);
////        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);
////        return eventRecordRepository.findByDateBetween(startOfMonth, endOfMonth);
////    }
//}