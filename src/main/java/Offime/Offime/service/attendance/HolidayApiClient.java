package Offime.Offime.service.attendance;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class HolidayApiClient {

    private static final String API_URL = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
    private static final String SERVICE_KEY = "1VYTYkZ8FK7pTxfpm%2FCw1pUwawFsdiBNV9MbW7vPG2zst2AsjDYQyWFOu5NdJYCfl0WoJiWRfakngxPo6bYSGA%3D%3D";

    public Set<LocalDate> fetchHolidays(int year, int month) {
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format("%s?serviceKey=%s&solYear=%d&solMonth=%02d&_type=json",
                API_URL, SERVICE_KEY, year, month);

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        // JSON 응답 파싱
        Set<LocalDate> holidays = parseHolidayResponse(response.getBody());
        return holidays.isEmpty() ? Collections.emptySet() : holidays;
    }


    private Set<LocalDate> parseHolidayResponse(String responseBody) {
        Set<LocalDate> holidays = new HashSet<>();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);
            JsonNode itemsNode = rootNode.path("response").path("body").path("items").path("item");

            if (itemsNode.isArray()) {
                for (JsonNode item : itemsNode) {
                    String locdate = item.path("locdate").asText();
                    LocalDate holidayDate = LocalDate.parse(locdate, DateTimeFormatter.ofPattern("yyyyMMdd"));
                    holidays.add(holidayDate);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse holiday response", e);
        }

        return holidays;
    }
}