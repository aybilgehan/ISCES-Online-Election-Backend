package com.example.ProjeDenemem.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CandidateController {
    @GetMapping("/showCandidates")
    public String showCandidates(){
        return "candidates";
    }

}
