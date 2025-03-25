package Offime.Offime.dto.reports.response;


import Offime.Offime.dto.reports.request.QuestionsRequestDto;
import Offime.Offime.entity.reports.Templates;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TemplatesResponseDto {
    private Long id;
    private String title;
    private Byte icon;
    private Byte color;

    @Builder
    public TemplatesResponseDto(Long id, String title, Byte icon, Byte color) {
        this.id = id;
        this.title = title;
        this.icon = icon;
        this.color = color;
    }

    public static TemplatesResponseDto fromEntity(Templates templates) {
        return TemplatesResponseDto.builder()
                .id(templates.getId())
                .title(templates.getTitle())
                .icon(templates.getIcon())
                .color(templates.getColor())
                .build();
    }
}


