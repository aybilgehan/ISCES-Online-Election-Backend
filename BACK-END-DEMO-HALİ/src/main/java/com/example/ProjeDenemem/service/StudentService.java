package com.example.ProjeDenemem.service;

import com.example.ProjeDenemem.entities.Student;
import com.example.ProjeDenemem.entities.User;
import com.example.ProjeDenemem.repository.StudentRepo;
import com.example.ProjeDenemem.repository.UserRepo;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {
    StudentRepo studentRepo;
    EntityManager entityManager;



    @Autowired
    public StudentService(StudentRepo studentRepo, EntityManager entityManager){
        this.studentRepo = studentRepo;
        this.entityManager = entityManager;
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
