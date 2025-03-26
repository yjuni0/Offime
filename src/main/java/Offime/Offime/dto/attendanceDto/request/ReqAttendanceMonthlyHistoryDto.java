package Offime.Offime.dto.attendanceDto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqAttendanceMonthlyHistoryDto {
    private int year;
    private int month;
}