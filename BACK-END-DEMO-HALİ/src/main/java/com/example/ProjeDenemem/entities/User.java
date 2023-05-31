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
@Table(name="user")
public class User{

    @Id
    @Column(name="user_id")
    private String user_id;
    @Column(name="first_name")
    private String firstName;
    @Column(name="last_name")
    private String lastName;

    @Column(name="email")
    private String email;
    @Column(name="password")
    private String password;
    @Column(name="is_voted")
    private int isVoted;
    @Column(name="role")
    private String role;

    @Column(name="department_id")
    private Long departmentId;

}
