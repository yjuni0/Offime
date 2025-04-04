package Offime.Offime.dto.response.attendance;

import java.util.List;

public class WeekdayResponseDto {
    private List<String> weekdays;

    public WeekdayResponseDto(List<String> weekdays) {
        this.weekdays = weekdays;
    }

    public List<String> getWeekdays() {
        return weekdays;
    }
}