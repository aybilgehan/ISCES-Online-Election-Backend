package com.example.ProjeDenemem.controller;

import com.example.ProjeDenemem.model.User;
import com.example.ProjeDenemem.service.UserService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User newUser){
        return userService.save(newUser);
    }
    public User getUserById(@PathVariable String  userId){
        return userService.getUserById(userId);
    }
}
