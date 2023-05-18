package com.example.ProjeDenemem.service;

import com.example.ProjeDenemem.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();

}
