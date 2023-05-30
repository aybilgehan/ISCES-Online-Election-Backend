package com.example.ProjeDenemem.controller;

import com.example.ProjeDenemem.entities.Candidate;
import com.example.ProjeDenemem.entities.Student;
import com.example.ProjeDenemem.entities.User;
import com.example.ProjeDenemem.service.CandidateService;
import com.example.ProjeDenemem.service.StudentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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

            studentService.findById(studentNumber).setIsVoted(1);  //  oy verenin isvotedı değişti
            return candidateService.getVote(candidateService.findById(departmentId)); // candidateın voteuna +1 eklendi.


    }


}
