package com.ISCES.repository;


import com.ISCES.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepo extends JpaRepository<Student,Long> {
    Student findByStudentNumber(Long studentNumber);
    List<Student> findByDepartmentId(Long departmentId);

    List<Student> findByDepartmentIdAndIsAppliedForCandidacy(Long departmentId, boolean isAppliedForCandidacy);
    List<Student> findByIsAppliedForCandidacy(boolean isAppliedForCandidacy);

}
