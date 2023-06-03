package com.ISCES.service;


import com.ISCES.entities.Student;
import com.ISCES.repository.StudentRepo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Getter
@Setter
public class StudentService {
    private StudentRepo studentRepo;




    @Autowired
    public StudentService(StudentRepo studentRepo){
        this.studentRepo = studentRepo;
    }


    @Transactional
    public List<Student> getAllStudents(){
        return studentRepo.findAll();
    }

    @Transactional
    public Student findByStudentNumber(Long studentNumber){
        return studentRepo.findByStudentNumber(studentNumber);
    }


    @Transactional
    public Student save(Student student){
        return studentRepo.save(student);
    }

    @Transactional
    public  List<Student> findByDepartmentIdAndIsAppliedForCandidacy(Long departmentId, Boolean isAppliedForCandidacy){
        return studentRepo.findByDepartmentIdAndIsAppliedForCandidacy(departmentId,isAppliedForCandidacy);
    }

    @Transactional
    public Student findByUser_Email(String email){
       return studentRepo.findByUser_Email(email);
    }

}
