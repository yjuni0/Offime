package Offime.Offime.service.attendance;

import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Set;

@Service
public class WorkingDaysService {

    private final HolidayApiClient holidayApiClient;

    public WorkingDaysService(HolidayApiClient holidayApiClient) {
        this.holidayApiClient = holidayApiClient;
    }

    public int calculateWorkingDaysForWeek(String date) {
        LocalDate currentDate = LocalDate.parse(date);
        LocalDate startOfWeek = currentDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)); // 주의 시작을 명확히 설정
        LocalDate endOfWeek = currentDate.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)); // 주의 종료 명확히 설정

        Set<LocalDate> holidays = holidayApiClient.fetchHolidays(startOfWeek.getYear(), startOfWeek.getMonthValue());
        return countWorkingDays(startOfWeek, endOfWeek, holidays);
    }


    public int calculateWorkingDaysForMonth(String date) {
        LocalDate currentDate = LocalDate.parse(date);
        LocalDate startOfMonth = currentDate.withDayOfMonth(1);
        LocalDate endOfMonth = currentDate.withDayOfMonth(currentDate.lengthOfMonth());

        Set<LocalDate> holidays = holidayApiClient.fetchHolidays(startOfMonth.getYear(), startOfMonth.getMonthValue());

        return countWorkingDays(startOfMonth, endOfMonth, holidays);
    }

    private int countWorkingDays(LocalDate start, LocalDate end, Set<LocalDate> holidays) {
        int workingDaysCount = 0;

        while (!start.isAfter(end)) {
            DayOfWeek dayOfWeek = start.getDayOfWeek();
            if (dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY && !holidays.contains(start)) {
                workingDaysCount++;
            }
            start = start.plusDays(1);
        }

        return workingDaysCount;
    }
}