package Offime.Offime.dto.request.attendance;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqAttendanceMonthlyHistoryDto {

    private Long memberId;
    private int year;
    private int month;
}