package com.example.demo.admin;

import com.example.demo.db.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/workers")
@CrossOrigin(origins = "*")
public class WorkersListController {

    @Autowired
    UserService userService;

    @GetMapping
    public List<String> showWorkers(){
        System.out.println("List of workers was shown");
        System.out.println("------------------------");
        return userService.getAllUsers();
    }
}
