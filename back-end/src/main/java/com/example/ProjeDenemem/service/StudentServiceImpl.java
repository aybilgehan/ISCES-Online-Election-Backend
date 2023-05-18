package com.example.ProjeDenemem.service;

import com.example.ProjeDenemem.model.Student;
import com.example.ProjeDenemem.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class StudentServiceImpl implements StudentService{
    @Autowired
    private StudentRepo studentRepo;

    @Override
    public Student saveStudent(Student student) {
        return studentRepo.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }
}
