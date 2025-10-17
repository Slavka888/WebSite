package com.example.demo.authorization;

import com.example.demo.db.UserRepository;
import com.example.demo.db.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/authorization")
@CrossOrigin(origins = "*")
public class AuthorizationController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Map<String, String>> authorization(@RequestBody Map<String, String> request){
        String email = request.get("email");
        String password = request.get("password");

        if (userService.authenticate(email, password)){
            if (email.equals("admin@mail.ru")){
                System.out.println("Admin was authorized");
                System.out.println("------------------------");
                return ResponseEntity.ok(Map.of("message", "Login successful. You are Administrator", "Role", "IsAdmin"));
            }
            else {
                System.out.println("User: " + email + " was authorized");
                System.out.println("------------------------");
                return ResponseEntity.ok(Map.of("message", "Login successful. You are User", "Role", "IsUser"));
            }
        }
        System.out.println("User: " + email + " is going to authorize");
        System.out.println("------------------------");
        return ResponseEntity.ok(Map.of("message", "Please, register in system"));
    }

}
