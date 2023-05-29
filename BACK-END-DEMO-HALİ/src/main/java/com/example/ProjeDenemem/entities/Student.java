package com.example.ProjeDenemem.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name="student")
public class Student {

    @Id
    @Column(name="student_number")
    private Long studentNumber;


    @Column(name="department_id")
    private Long departmentId;

    @Column(name = "email")
    private String email;
    @Column(name="first_name")
    private String firstName;
    @Column(name="second_name")
    private String middleName;
    @Column(name="last_name")
    private String lastName;
    @Column(name="grade")
    private Float grade;
    @Column(name="term")
    private Long term;
    @Column(name="is_voted")
    private int isVoted;

}