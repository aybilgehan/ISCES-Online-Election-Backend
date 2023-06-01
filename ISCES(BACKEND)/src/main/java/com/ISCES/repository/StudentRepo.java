package com.ISCES.repository;


import com.ISCES.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Student,Long> {
    Student findByStudentNumber(Long studentNumber);
    Student findByDepartmentId(Long departmentId);

}