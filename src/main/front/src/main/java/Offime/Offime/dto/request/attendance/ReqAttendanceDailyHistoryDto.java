package Offime.Offime.dto.request.attendance;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class ReqAttendanceDailyHistoryDto {

    private LocalDate date;
}