package com.ISCES.service;


import com.ISCES.entities.Admin;
import com.ISCES.repository.AdminRepo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Getter
@Setter
@Service
public class AdminService {
    private AdminRepo adminRepo;

    @Autowired
    public AdminService(AdminRepo adminRepo) {
        this.adminRepo = adminRepo;
    }

    public Admin findByUser_Role(String role){
        return adminRepo.findByUser_Role(role);
    }

}
