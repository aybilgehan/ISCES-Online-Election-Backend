package com.example.ProjeDenemem.controller;


import com.example.ProjeDenemem.entities.Candidate;
import com.example.ProjeDenemem.service.CandidateService;
import com.example.ProjeDenemem.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CandidateController {
    CandidateService candidateService;
    UserService userService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping("/showCandidates/{departmentId}")
    public List<Candidate> showCandidates(@PathVariable Long departmentId){
        return candidateService.createCandidateListByDepartmentId(departmentId);
    }



}
