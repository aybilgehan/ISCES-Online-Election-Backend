package com.ISCES.repository;


import com.ISCES.entities.Candidate;
import com.ISCES.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepo extends JpaRepository<Candidate,Long> {
    Candidate findByCandidateId(Long candidateId);
    List<Candidate> findByStudent_DepartmentId(Long departmentId);

    List<Candidate> findByStudent_DepartmentIdAndStatus(Long departmentId, Boolean status);

}
