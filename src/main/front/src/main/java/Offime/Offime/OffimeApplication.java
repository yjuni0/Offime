package Offime.Offime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class OffimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(OffimeApplication.class, args);
	}
}
