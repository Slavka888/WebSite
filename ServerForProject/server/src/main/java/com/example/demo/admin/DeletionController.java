package com.example.demo.admin;

import com.example.demo.db.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/delete")
@CrossOrigin(origins = "*")
public class DeletionController {
    @Autowired
    UserService userService;

    @DeleteMapping
    public ResponseEntity<Map<String, String>> deleteUser(@RequestBody Map<String, String> request){
        try {
            String emailToDelete = request.get("workerEmail");
            userService.deleteUser(emailToDelete);
            System.out.println("User: " + emailToDelete + " was deleted");
            System.out.println("------------------------");
            return ResponseEntity.ok().build();
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }
}
