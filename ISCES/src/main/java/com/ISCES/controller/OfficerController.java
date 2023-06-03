package com.ISCES.controller;

import com.ISCES.entities.Candidate;
import com.ISCES.entities.Student;
import com.ISCES.service.CandidateService;
import com.ISCES.service.StudentService;
import com.ISCES.service.UserService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Getter
@Setter
@RestController
public class OfficerController {// Bütün return typeler değişebilir . Response ve Request packageına yeni classlar eklenmeli frontendden hangi bilgi istendiğine göre


    private CandidateService candidateService;
    private UserService userService;

    private StudentService studentService;

    public OfficerController(CandidateService candidateService, UserService userService, StudentService studentService) {
        this.candidateService = candidateService;
        this.userService = userService;
        this.studentService = studentService;
    }

    @GetMapping("/unevaluatedStudents/{departmentId}")
    public List<Student> unevaluatedStudents(@PathVariable  Long departmentId){
        return studentService.findByDepartmentIdAndIsAppliedForCandidacyAndUser_Role(departmentId,true,"student"); //  it returns the students who is not approved and not disapproved yet.
    }                                                                                                         //  true means this student is applied for candidacy.


    @GetMapping("/showConfirmedStudents/{departmentId}") // confirmedStudents means candidates
    public List<Candidate> getConfirmedStudents(@PathVariable  Long departmentId){
        return candidateService.findCandidateByDepartmentId(departmentId); //  it returns the candidate  list grouped by officer who are approved.
    }

    @GetMapping("/showRejectedStudents/{departmentId}") // if we need this for officer, we should this implement again...!!!
    public List<Student> getRejectedStudents(@PathVariable  Long departmentId){
        return studentService.findByDepartmentIdAndIsAppliedForCandidacyAndUser_Role(departmentId,null,"student"); //  it returns the students who are rejected and sets isApplied null
                                                                                                              //   because isApplied of rejected student  is null.
    }


    // GET MAPPING DEĞİŞECEK -> PostMapping
    @GetMapping("/confirmStudent/{studentNumber}") // it returns candidate because application is confirmed. Student is candidate right now.
    public Candidate confirmStudent(@PathVariable Long studentNumber){
        Student tempStudent = studentService.findByStudentNumber(studentNumber);
        Candidate tempCandidate = new Candidate();
        if(tempStudent.getIsAppliedForCandidacy()){
            Long tempCandidateId = Long.valueOf(candidateService.getAllCandidates().size()) + 1; // it's to assign an id to the candidate.
            tempCandidate.setCandidateId(tempCandidateId);
            tempCandidate.setStudent(tempStudent);
            tempCandidate.setVotes(Long.valueOf(0));
            tempCandidate.getStudent().getUser().setRole("candidate"); // user role is changed as candidate
            Candidate savedCandidate = candidateService.save(tempCandidate);
            return candidateService.save(tempCandidate); // it returns the candidate who is approved by officer.
        }
        return tempCandidate;
    }

    // GET MAPPING DEĞİŞECEK -> PutMapping
    @GetMapping("/rejectStudent/{studentNumber}") //  it returns student . If applications is not approved by officer , student is still student not candidate!!
    public Student rejectStudent(@PathVariable Long studentNumber){// candidacy of candidate is disapproved.
        if(studentService.findByStudentNumber(studentNumber).getIsAppliedForCandidacy()){
            studentService.findByStudentNumber(studentNumber).setIsAppliedForCandidacy(null); // isAppliedCandidacy of student is changed to null
            return studentService.save(studentService.findByStudentNumber(studentNumber));// It returns and saves the student who is rejected by officer.
        }
        return null;
    }


}
