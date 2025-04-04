package Offime.Offime.service.attendance;

import Offime.Offime.dto.request.attendance.HolidayRequestDto;
import Offime.Offime.dto.response.attendance.HolidayResponseDto;
import Offime.Offime.dto.response.attendance.WeekdayResponseDto;
import Offime.Offime.repository.attendance.HolidayRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class HolidayService {

    private final HolidayRepository holidayRepository;

    public HolidayService(HolidayRepository holidayRepository) {
        this.holidayRepository = holidayRepository;
    }

    public HolidayResponseDto getHolidays(HolidayRequestDto requestDto) {
        List<String> holidays = new ArrayList<>();
        holidayRepository.findAll().forEach(entity -> {
            if (entity.getDate().startsWith(String.valueOf(requestDto.getYear()))) {
                holidays.add(entity.getDate());
            }
        });
        return new HolidayResponseDto(holidays);
    }

    public WeekdayResponseDto getWeekdays(HolidayRequestDto requestDto) {
        List<String> weekdays = new ArrayList<>();
        LocalDate startDate = LocalDate.of(requestDto.getYear(), 1, 1);
        LocalDate endDate = LocalDate.of(requestDto.getYear(), 12, 31);

        while (!startDate.isAfter(endDate)) {
            int dayOfWeek = startDate.getDayOfWeek().getValue(); // 월요일=1, 일요일=7

            if (dayOfWeek < 6 && !holidayRepository.existsById(startDate.toString().replace("-", ""))) {
                weekdays.add(startDate.toString());
            }
            startDate = startDate.plusDays(1);
        }
        return new WeekdayResponseDto(weekdays);
    }
}