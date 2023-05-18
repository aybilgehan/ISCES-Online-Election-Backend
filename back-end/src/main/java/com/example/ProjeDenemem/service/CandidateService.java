package com.example.ProjeDenemem.service;

import com.example.ProjeDenemem.model.Candidate;

import java.util.List;

public interface CandidateService {
    public Candidate saveCandidate(Candidate candidate);
    public List<Candidate> getAllCandidates();
}
