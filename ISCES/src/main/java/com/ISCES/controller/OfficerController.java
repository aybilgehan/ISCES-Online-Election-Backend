package com.ISCES.controller;

import com.ISCES.entities.Candidate;
import com.ISCES.entities.Student;
import com.ISCES.service.CandidateService;
import com.ISCES.service.StudentService;
import com.ISCES.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OfficerController {


    CandidateService candidateService;
    UserService userService;

    StudentService studentService;

    public OfficerController(CandidateService candidateService, UserService userService, StudentService studentService) {
        this.candidateService = candidateService;
        this.userService = userService;
        this.studentService = studentService;
    }

    @GetMapping("/unevaluatedCandidates/{departmentId}")
    public List<Student> unevaluatedCandidates(@PathVariable  Long departmentId){
        return studentService.findByDepartmentIdAndIsAppliedForCandidacy(departmentId,true); //  it returns the candidates who is not approved and not disapproved yet.
    }                                                                                                         // true means this student is applied for candidacy.


    @GetMapping("/showConfirmedCandidates/{departmentId}")
    public List<Candidate> getConfirmedCandidates(@PathVariable  Long departmentId){
        return candidateService.findByDepartmentIdAndStatus(departmentId,true); //  it returns the candidates who are approved.
    }

    @GetMapping("/showRejectedCandidates/{departmentId}")
    public List<Candidate> getRejectedCandidates(@PathVariable  Long departmentId){
        return candidateService.findByDepartmentIdAndStatus(departmentId,false); //  it returns the candidates who are rejected
    }


    @PostMapping("/confirmCandidate/{studentNumber}") // it returns candidate because application is confirmed. Student is candidate right now.
    public Candidate confirmCandidate(@PathVariable Long studentNumber){
        Candidate tempCandidate = new Candidate();
        Long tempCandidateId = Long.valueOf(candidateService.getAllCandidates().size()) + 1; // it's to assign an id to the candidate.
        Student tempStudent = studentService.findByStudentNumber(studentNumber);
        tempCandidate.setCandidateId(tempCandidateId);
        tempCandidate.setStudent(tempStudent);
        tempCandidate.setStatus(true);// candidacy of candidate is approved.
        tempCandidate.setVotes(Long.valueOf(0));
        tempCandidate.getStudent().getUser().setRole("candidate"); // user role is changed as candidate
        Candidate savedCandidate = candidateService.save(tempCandidate);
        candidateService.findByStudent_StudentNumber(studentNumber).getStudent().setIsAppliedForCandidacy(false); // isAppliedForCandidacy of student is changed to false
                                                                                                                                        // because this student is accepted.

        return candidateService.save(tempCandidate); // it returns the candidate who is approved by officer.
    }

    @PutMapping("/rejectCandidate/{studentNumber}") //  it returns student . If applications is not approved by officer , student is still student not candidate!!
    public Student rejectCandidate(@PathVariable Long studentNumber){// candidacy of candidate is disapproved.
        return studentService.findByStudentNumber(studentNumber);// It returns the candidate who is approved by officer.
    }


}
