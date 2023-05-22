package com.example.ProjeDenemem.repository;

import com.example.ProjeDenemem.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, String>{


}
