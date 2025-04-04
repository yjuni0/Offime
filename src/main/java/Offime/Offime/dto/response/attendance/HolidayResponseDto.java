package Offime.Offime.dto.response.attendance;

import java.util.List;

public class HolidayResponseDto {
    private List<String> holidays;

    public HolidayResponseDto(List<String> holidays) {
        this.holidays = holidays;
    }

    public List<String> getHolidays() {
        return holidays;
    }
}