package com.example.ProjeDenemem.repository;

import com.example.ProjeDenemem.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Integer> {
}
