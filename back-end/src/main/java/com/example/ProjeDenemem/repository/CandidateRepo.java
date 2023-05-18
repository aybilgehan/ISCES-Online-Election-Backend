package com.example.ProjeDenemem.repository;

import com.example.ProjeDenemem.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepo extends JpaRepository<Candidate,Integer> {
}
