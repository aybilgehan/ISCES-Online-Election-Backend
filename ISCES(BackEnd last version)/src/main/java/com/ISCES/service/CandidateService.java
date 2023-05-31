package com.ISCES.service;


import com.ISCES.entities.Candidate;
import com.ISCES.repository.CandidateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
public class CandidateService {
    CandidateRepo candidateRepo;

    @Autowired
    public CandidateService(CandidateRepo candidateRepo) {
        this.candidateRepo = candidateRepo;
    }

    public List<Candidate> getAllCandidates(){
        return candidateRepo.findAll();
    }

    @Transactional
    public Candidate findById(long id){
        for(Candidate candidate:candidateRepo.findAll()){
            if(candidate.getCandidateID().equals(id)){
                return candidate;
            }
        }return null;
    }

    @Transactional
    public List<Candidate> createCandidateListByDepartmentId(Long departmentId){
        List<Candidate> tempCandidateList = new ArrayList<Candidate>();
        for(Candidate candidate: candidateRepo.findAll()){
            if(candidate.getStudent().getDepartmentId().equals(departmentId)){
                tempCandidateList.add(candidate);
            }
        }
        return tempCandidateList;
    }

    @Transactional
    public Candidate save(Candidate candidate){
        return candidateRepo.save(candidate);
    }

    @Transactional
        public Candidate getVote(Candidate  candidate){
        for(Candidate theCandidate: candidateRepo.findAll()){
            if(theCandidate.equals(candidate)){
                candidate.setVotes(candidate.getVotes() + 1);
                return candidateRepo.save(candidate);
            }
        }
        return null;
    }


}
