package com.ISCES.service;


import com.ISCES.entities.Student;
import com.ISCES.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {
    StudentRepo studentRepo;




    @Autowired
    public StudentService(StudentRepo studentRepo){
        this.studentRepo = studentRepo;
    }


    @Transactional
    public List<Student> getAllUsers(){
        return studentRepo.findAll();
    }

    @Transactional
    public Student findById(Long studentNumber){
        return studentRepo.findByStudentNumber(studentNumber);
    }

}
