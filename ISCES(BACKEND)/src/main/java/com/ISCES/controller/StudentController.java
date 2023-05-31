package com.ISCES.controller;


import com.ISCES.entities.Candidate;
import com.ISCES.response.LoginResponse;
import com.ISCES.response.VoteResponse;
import com.ISCES.service.CandidateService;
import com.ISCES.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class StudentController {

    StudentService studentService;
    CandidateService candidateService;

    public StudentController(StudentService studentService, CandidateService candidateService) {
        this.studentService = studentService;
        this.candidateService = candidateService;
    }

    @GetMapping("/vote/{studentNumber}/{candidateId}") // studentNumber is voter's number, departmentıd is candidate's id.
    public ResponseEntity<VoteResponse> vote(@PathVariable Long studentNumber, @PathVariable Long candidateId){
        String message = "Couldn't vote";
        List<Candidate> candidateList = candidateService.findCandidateByDepartmentId(studentService.findByStudentNumber(studentNumber).getDepartmentId());
        if(!studentService.findByStudentNumber(studentNumber).isVoted() && studentService.findByStudentNumber(studentNumber).getDepartmentId().equals(candidateService.findById(candidateId).getStudent().getDepartmentId())) {
                // if student didn't vote   and departmentId of student and departmentId of candidate is equal.
                studentService.findByStudentNumber(studentNumber).setVoted(true); //  oy verenin isvotedı değişti
                candidateService.getVote(candidateService.findById(candidateId)); // candidate's vote += 1
                message = "Student which has id: " + studentNumber + " voted.";

            return new ResponseEntity<>(new VoteResponse(message,studentNumber), HttpStatus.OK);
        }
        return new ResponseEntity<>(new VoteResponse(message),HttpStatus.BAD_REQUEST);
    }


}
