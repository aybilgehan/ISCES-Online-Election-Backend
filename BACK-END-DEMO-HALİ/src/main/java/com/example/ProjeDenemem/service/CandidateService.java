package com.example.ProjeDenemem.service;

import com.example.ProjeDenemem.entities.Candidate;
import com.example.ProjeDenemem.entities.User;
import com.example.ProjeDenemem.repository.CandidateRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CandidateService {
    CandidateRepo candidateRepo;

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
            if(candidate.getDepartmentId().equals(departmentId)){
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
