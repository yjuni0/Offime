package Offime.Offime.dto.reports.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ReportsRequestDto {

    private String title;
    private Long writerId;
    private Long templateId;
    private List<ReportsResponseRequestDto> responseData;

}
