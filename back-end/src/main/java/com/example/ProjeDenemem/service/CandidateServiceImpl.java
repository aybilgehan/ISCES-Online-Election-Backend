package com.example.ProjeDenemem.service;

import com.example.ProjeDenemem.model.Candidate;
import com.example.ProjeDenemem.repository.CandidateRepo;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CandidateServiceImpl implements CandidateService{
    @Autowired
    private CandidateRepo candidateRepo;

    @Override
    public Candidate saveCandidate(Candidate candidate) {
        return candidateRepo.save(candidate);
    }

    @Override
    public List<Candidate> getAllCandidates() {
        return candidateRepo.findAll();
    }

}

