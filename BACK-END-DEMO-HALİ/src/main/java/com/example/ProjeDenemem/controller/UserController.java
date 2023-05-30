package com.example.ProjeDenemem.controller;

import com.example.ProjeDenemem.entities.Candidate;
import com.example.ProjeDenemem.entities.LoginResponse;
import com.example.ProjeDenemem.entities.User;
import com.example.ProjeDenemem.service.CandidateService;
import com.example.ProjeDenemem.service.UserService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {


    private UserService userService;
    private CandidateService candidateService;

    @Autowired
    public UserController(UserService userService,CandidateService candidateService) {
        this.userService = userService;
        this.candidateService= candidateService;

    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }



    @GetMapping("/loginget/{email}/{password}")
    // Basically generic type login function.
    public ResponseEntity<LoginResponse> login(@PathVariable String email, @PathVariable String password) {
        String controller = "";
        // user type for front-end
        User user = userService.findByEmail(email);
        if (user != null && user.getPassword().equals(password)){
            controller = "Logged-in";
        }

        try {
            if((controller.equals("Logged-in"))){
                // Http status 2**
                return new ResponseEntity<>(new LoginResponse(200, controller, "/login", user), HttpStatus.OK);
            }
            else {
                // Http status 4**
                return new ResponseEntity<>(new LoginResponse(400, "Invalid Requests", "/login"), HttpStatus.BAD_REQUEST);
            }
        }
        catch (UsernameNotFoundException exception){
            return new ResponseEntity<>(new LoginResponse(400, "Email does not exists!", "/login"), HttpStatus.BAD_REQUEST);
        }
    }







}
