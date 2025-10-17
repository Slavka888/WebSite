package com.example.demo.worker;

import com.example.demo.db.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/getTasks")
@CrossOrigin(origins = "http://localhost:63343")
public class GetTasksController {
    @Autowired
    UserService userService;


    @GetMapping
    public ResponseEntity<Map<String, String>> getTask(@RequestParam String email){
        String task = userService.getTaskByEmail(email);
        System.out.println("User: " + email + " has task");
        System.out.println("------------------------");
        return ResponseEntity.ok(Map.of("task", task));
    }
}
