package com.ISCES.controller;


import com.ISCES.entities.Candidate;
import com.ISCES.service.CandidateService;
import com.ISCES.service.StudentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class StudentController {

    StudentService studentService;
    CandidateService candidateService;

    public StudentController(StudentService studentService, CandidateService candidateService) {
        this.studentService = studentService;
        this.candidateService = candidateService;
    }

    @GetMapping("/showCandidates/vote/{studentNumber}/{departmentId}") // studentNumber is voter's number, departmentıd is candidate's id.
    public Candidate vote(@PathVariable Long studentNumber , @PathVariable Long departmentId){

              //  oy verenin isvotedı değişti
            return candidateService.getVote(candidateService.findById(departmentId)); // candidateın voteuna +1 eklendi.


    }


}
