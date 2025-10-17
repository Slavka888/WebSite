package com.example.demo.worker;

import com.example.demo.db.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/deleteTasks")
@CrossOrigin(origins = "http://localhost:63343")
public class DeleteTaskController {
    @Autowired
    UserService userService;


    @DeleteMapping
    public ResponseEntity<Map<String, String>> getTask(@RequestParam String email){
        userService.deleteTask(email);
        System.out.println("Task for " + email + " was finished");
        System.out.println("------------------------");
        return ResponseEntity.ok(Map.of("task", "taskDeleted"));
    }
}