package com.ISCES.entities;


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
public class User {

    @Id
    @Column(name="email")
    private String email;

    @Column(name="password")
    private String password;

    @Column(name="role")// Roles  are "student","officer","rector","department representative","candidate"
    private String role;


}
