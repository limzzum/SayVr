package com.npc.say_vr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class SayVrApplication {

	public static void main(String[] args) {
		SpringApplication.run(SayVrApplication.class, args);
	}

}
