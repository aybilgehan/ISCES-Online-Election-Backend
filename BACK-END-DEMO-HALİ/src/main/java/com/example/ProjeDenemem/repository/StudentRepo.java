package com.example.ProjeDenemem.repository;

import com.example.ProjeDenemem.entities.Student;
import org.hibernate.metamodel.model.convert.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Student,Long> {
    Student findByStudentNumber(Long studentNumber);

}
