package com.example.ProjeDenemem.controller;

import com.example.ProjeDenemem.entities.LoginResponse;
import com.example.ProjeDenemem.entities.User;
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

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }



    @GetMapping("/loginget/{email}/{password}")
    // Basically generic type login function.
    public ResponseEntity<LoginResponse> login(@PathVariable String email, @PathVariable String password) {

        String userType = "";
        // user type for front-end
        User user = userService.findByEmail(email);
        System.out.println(user.getEmail());

        System.out.println("Database password " + user.getPassword());
        System.out.println("user password: " + password);
        System.out.println(user.getPassword().equals(password));
        if (user != null && user.getPassword().equals(password)){
            System.out.println("girmiş");
            userType = "User";
        }
        System.out.println("girmemiş");
        System.out.println(user.getId());
        System.out.println("Password: " + password);
        try {
            if((userType.equals("User"))){
                // Http status 2**
                System.out.println(userType);
                return new ResponseEntity<>(new LoginResponse(200, userType, "/login", userType), HttpStatus.OK);
            }
            else {
                // Http status 4**
                return new ResponseEntity<>(new LoginResponse(400, "Invalid Requests", "/login", userType), HttpStatus.BAD_REQUEST);
            }
        }
        catch (UsernameNotFoundException exception){
            return new ResponseEntity<>(new LoginResponse(400, "Email does not exists!", "/login", userType), HttpStatus.BAD_REQUEST);
        }
        }





}
