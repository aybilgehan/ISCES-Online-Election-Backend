package com.ISCES.service;


import com.ISCES.entities.User;
import com.ISCES.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    UserRepo userRepo;



    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    @Transactional
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    @Transactional
    public User findByEmail(String email){
        for(User user: userRepo.findAll()){
            if(user.getEmail().equals(email)){
                return user;
            }
        }
        return null;
    }




}
