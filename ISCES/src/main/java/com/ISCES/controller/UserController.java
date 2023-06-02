package com.ISCES.controller;


import com.ISCES.response.LoginResponse;
import com.ISCES.entities.User;
import com.ISCES.service.CandidateService;
import com.ISCES.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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



    @GetMapping("/login/{email}/{password}")// user logins with email and password
    public ResponseEntity<LoginResponse> login(@PathVariable String email, @PathVariable String password) {
        String controller = "";// message for frontend  (Logged-in )
        User user = userService.findByEmail(email);
        if (user != null && user.getPassword().equals(password)){
            controller = "Logged-in";
        }
        try {
            if((controller.equals("Logged-in"))){
                // Http status 2**
                return new ResponseEntity<>(new LoginResponse(200, controller, user), HttpStatus.OK);
            }
            else {
                // Http status 4**
                return new ResponseEntity<>(new LoginResponse(400, "Invalid Requests"), HttpStatus.BAD_REQUEST);
            }
        }
        catch (UsernameNotFoundException exception){
            return new ResponseEntity<>(new LoginResponse(400, "Email does not exists!"), HttpStatus.BAD_REQUEST);
        }
    }







}
