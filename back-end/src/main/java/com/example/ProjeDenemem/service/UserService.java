package com.example.ProjeDenemem.service;


import com.example.ProjeDenemem.model.User;
import com.example.ProjeDenemem.repository.UserRepo;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class UserService {
    UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }
    @GetMapping("/{userId}")
    public User getUserById(String userId) {
        return userRepo.findById(userId).orElse(null);
    }

    public User save(User user){
        return userRepo.save(user);
    }
}
