package Offime.Offime.dto.reports.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReportsRequestDto {

    private String title;
    private Long writerId;
    private Long templateId;


}
