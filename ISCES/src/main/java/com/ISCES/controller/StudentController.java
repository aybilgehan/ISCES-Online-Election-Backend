package com.ISCES.controller;


import com.ISCES.entities.Candidate;
import com.ISCES.entities.Student;
import com.ISCES.request.CandidacyRequest;
import com.ISCES.response.VoteResponse;
import com.ISCES.service.CandidateService;
import com.ISCES.service.StudentService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@Setter
@Getter
@RestController
public class StudentController { // Bütün return typeler değişebilir . Response ve Request packageına yeni classlar eklenmeli frontendden hangi bilgi istendiğine göre

    private StudentService studentService;
    private CandidateService candidateService;

    public StudentController(StudentService studentService, CandidateService candidateService) {
        this.studentService = studentService;
        this.candidateService = candidateService;
    }


    @GetMapping("/students")
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @GetMapping("/getStudent/{studentNumber}")
    public Student findStudentById(@PathVariable Long studentNumber){
        return studentService.findByStudentNumber(studentNumber);
    }

    // GETMAPPING DEĞİŞECEK
    @GetMapping("/vote/{studentNumber}/{candidateId}") // studentNumber is voter's number, departmentıd "is candidate's id.
    public ResponseEntity<VoteResponse> vote(@PathVariable Long studentNumber, @PathVariable Long candidateId){
        String message = "Couldn't vote";
        List<Candidate> candidateList = candidateService.findCandidateByDepartmentId(studentService.findByStudentNumber(studentNumber).getDepartmentId());
        if(!studentService.findByStudentNumber(studentNumber).isVoted() &&
            studentService.findByStudentNumber(studentNumber).getDepartmentId().equals(candidateService.findById(candidateId).getStudent().getDepartmentId())){
                // if student didn't vote   and departmentId of student and departmentId of candidate is equal.
                studentService.findByStudentNumber(studentNumber).setVoted(true); //  the isVoted of voter is changed.
                candidateService.getVote(candidateService.findById(candidateId)); // candidate's vote += 1
                message = "Student which has id: " + studentNumber + " voted.";

            return new ResponseEntity<>(new VoteResponse(message,studentNumber), HttpStatus.OK);
        }
        return new ResponseEntity<>(new VoteResponse(message),HttpStatus.BAD_REQUEST);
    }

    // GETMAPPING DEĞİŞECEK
    @GetMapping("/applyToBeCandidate/{studentNumber}") // it's for students to apply to be a candidate         !!!!!!!!! BELGE EKLEME YAPARKEN BU KISIMDA DEĞİŞİKLİK YAPILACAK !!!!!
    public ResponseEntity<CandidacyRequest> applyToBeCandidate(@PathVariable Long studentNumber){

        if((studentService.findByStudentNumber(studentNumber).getIsAppliedForCandidacy() != null) &&
                (!studentService.findByStudentNumber(studentNumber).getIsAppliedForCandidacy() )) { // if student didn't apply for candidacy or didn't rejected by officer (isApplied != false
                                                                                            //                                                                      isApplied != null)
            Student tempStudent = studentService.findByStudentNumber(studentNumber);
            studentService.findByStudentNumber(studentNumber).setIsAppliedForCandidacy(true);// The isAppliedForCandidacy of the student applying for candidacy has been changed.
            studentService.save(studentService.findByStudentNumber(studentNumber)); // changes are saved for this student.
            CandidacyRequest candidacyRequest = new CandidacyRequest("Applied", tempStudent); // it's for student who is not applied for candidacy before for this election.
            return ResponseEntity.ok(candidacyRequest);
        }
        CandidacyRequest notAppliedRequest = new CandidacyRequest("This student has already applied for candidacy!");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(notAppliedRequest); //  message for student who is applied for candidacy before for this election
    }


}
