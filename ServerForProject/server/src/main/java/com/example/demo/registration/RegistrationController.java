package com.example.demo.registration;

import com.example.demo.db.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "*")
public class RegistrationController {
    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, String> request){
        String email = request.get("email");
        String password = request.get("password");

        if (userService.userExists(email)) {
            System.out.println("User: " + email + " tried registration again");
            System.out.println("------------------------");
            return ResponseEntity.badRequest().body(Map.of("message", "User already exists"));
        }

        userService.registerUser(email, password);
        System.out.println("New user: " + email + " registered in system");
        System.out.println("------------------------");
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }
}
