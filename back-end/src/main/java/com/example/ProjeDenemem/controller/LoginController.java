package com.example.ProjeDenemem.controller;



import com.example.ProjeDenemem.model.User;
import com.example.ProjeDenemem.repository.UserRepo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
public class LoginController {

    UserRepo userRepo;
    @GetMapping("/showMyLoginPage")
    public String login(Model model){
        User user = new User();
        model.addAttribute("user",user);
        return "fancy-login";
    }





}
