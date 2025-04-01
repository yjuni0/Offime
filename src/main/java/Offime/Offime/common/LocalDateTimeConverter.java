package Offime.Offime.common;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Converter(autoApply = true)
public class LocalDateTimeConverter implements AttributeConverter<LocalDateTime, LocalDateTime> {

    @Override
    public LocalDateTime convertToDatabaseColumn(LocalDateTime attribute) {
        if (attribute == null) return null;
        return attribute.truncatedTo(ChronoUnit.SECONDS);  // 나노초 절삭
    }

    @Override
    public LocalDateTime convertToEntityAttribute(LocalDateTime dbData) {
        return dbData;  // DB에서 읽어올 때는 이미 절삭된 상태
    }
}