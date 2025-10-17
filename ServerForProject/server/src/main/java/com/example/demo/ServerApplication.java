package com.example.demo;

import com.example.demo.db.User;
import com.example.demo.db.UserRepository;
import com.example.demo.db.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {
	@Autowired
	private UserRepository userRepository;

	@Override
	public void run(String... args) throws Exception {
		final String adminEmail = "admin@mail.ru";
		final String adminPassword = "admin";

		if(!userRepository.existsByEmail(adminEmail)){
			User admin = new User(adminEmail, adminPassword, "");
			userRepository.save(admin);
			System.out.println("Admin user created");
		}
	}


	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
}
