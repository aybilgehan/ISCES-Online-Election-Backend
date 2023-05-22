package com.example.ProjeDenemem.service;



import com.example.ProjeDenemem.entities.User;
import com.example.ProjeDenemem.repository.UserRepo;


import jakarta.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
public class UserService {
    UserRepo userRepo;


    EntityManager entityManager;



    @Autowired
    public UserService(UserRepo userRepo, EntityManager entityManager) {
        this.userRepo = userRepo;
        this.entityManager = entityManager;
    }



    public List<User> getAllUsers(){
        return userRepo.findAll();
    }


    public User findByEmail(String email){
        for(User user: userRepo.findAll()){
            if(user.getEmail().equals(email)){
                return user;
            }
        }
        return null;
    }




}
