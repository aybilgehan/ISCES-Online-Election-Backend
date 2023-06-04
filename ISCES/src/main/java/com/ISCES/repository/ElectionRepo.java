package com.ISCES.repository;

import com.ISCES.entities.Election;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElectionRepo extends JpaRepository<Election, Long> {

}
