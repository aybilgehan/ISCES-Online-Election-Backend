package com.example.restart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.example.restart")
public class RestartApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestartApplication.class, args);
	}

}
