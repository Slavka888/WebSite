package com.example.demo.admin;

import com.example.demo.db.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    @Autowired
    UserService userService;


    @PostMapping
    public ResponseEntity<Map<String, String>> createTask(@RequestBody Map<String, String> request) {
        String email = request.get("workerEmail");
        String newTask = request.get("taskText");

        userService.updateTask(email, newTask);

        System.out.println("Email: " + email);
        System.out.println("Task: " + newTask);
        System.out.println("------------------------");
        return ResponseEntity.ok(Map.of("message", "Task was given successfully"));    }
}
