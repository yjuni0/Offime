package Offime.Offime.dto.attendance.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqAttendanceWeeklyHistoryDto {
    private int year;
    private int month;
    private int startDay;
}
