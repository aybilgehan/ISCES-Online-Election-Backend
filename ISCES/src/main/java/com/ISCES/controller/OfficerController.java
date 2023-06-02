package com.ISCES.controller;

import com.ISCES.entities.Candidate;
import com.ISCES.service.CandidateService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OfficerController {


    CandidateService candidateService;


    public OfficerController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping("/unevaluatedCandidates/{departmentId}")
    public List<Candidate> unevaluatedCandidates(@PathVariable  Long departmentId){
        return candidateService.findByDepartmentIdAndStatus(departmentId,null); //  it returns the candidates who is not approved and not disapproved yet.
    }


    @GetMapping("/showConfirmedCandidates/{departmentId}")
    public List<Candidate> getConfirmedCandidates(@PathVariable  Long departmentId){
        return candidateService.findByDepartmentIdAndStatus(departmentId,true); //  it returns the candidates who are approved.
    }

    @GetMapping("/showRejectedCandidates/{departmentId}")
    public List<Candidate> getRejectedCandidates(@PathVariable  Long departmentId){
        return candidateService.findByDepartmentIdAndStatus(departmentId,false); //  it returns the candidates who are rejected
    }

    @GetMapping("/confirmCandidate/{candidateId}")
    public Candidate confirmCandidate(@PathVariable Long candidateId){
        System.out.println(candidateService.findById(candidateId));
        candidateService.findById(candidateId).setStatus(true); // candidacy of candidate is approved.
        return candidateService.save(candidateService.findById(candidateId)); // it returns the candidate who is approved by officer.
    }

    @GetMapping("/rejectCandidate/{candidateId}")
    public Candidate rejectCandidate(@PathVariable Long candidateId){
        candidateService.findById(candidateId).setStatus(false); // candidacy of candidate is disapproved.
        return candidateService.save(candidateService.findById(candidateId));// It returns the candidate who is approved by officer.
    }

}
