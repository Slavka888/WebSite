package com.example.demo.db;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean userExists(String email){
        return userRepository.existsByEmail(email);
    }

    public User registerUser(String email, String password){
        if (userExists(email)){
            throw new RuntimeException("User with email " + email +" already exists");
        }
        String setPassword = password;
        User newUser = new User(email, setPassword, "");
        return userRepository.save(newUser);
    }

    public String getTaskByEmail(String email){
        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new RuntimeException("User not found");
        }
        return user.getTask();
    }

    public void updateTask(String email, String newTask){
        User user = userRepository.findByEmail(email);
        if (user != null){
            user.setTask(newTask);
            userRepository.save(user);
        }
    }

    public boolean authenticate(String email, String password){
        User user = userRepository.findByEmail(email);
        if (user == null){
            return false;
        }
        return password.equals(user.getPassword());
    }

    public void deleteUser(String email){
        User user = userRepository.findByEmail(email);

        if(user == null){
            throw new RuntimeException("User not found");
        }

        userRepository.delete(user);
    }

    public List<String> getAllUsers(){
        return userRepository.findAll().stream().filter(user -> !user.getEmail().equals("admin@mail.ru")).map(User::getEmail).collect(Collectors.toList());
    }

    public void deleteTask(String email){
        User user = userRepository.findByEmail(email);
        user.setTask("");
        userRepository.save(user);
    }
}
