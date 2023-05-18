package com.example.ProjeDenemem.service;

import com.example.ProjeDenemem.model.Representative;
import com.example.ProjeDenemem.model.Student;
import com.example.ProjeDenemem.repository.RepresentativeRepo;
import com.example.ProjeDenemem.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class RepresentativeServiceImpl implements RepresentativeService{
    @Autowired
    private RepresentativeRepo representativeRepo;

    @Override
    public Representative saveRepresentative(Representative Representative) {
        return representativeRepo.save(Representative);
    }

    @Override
    public List<Representative> getAllRepresentatives() {
        return representativeRepo.findAll();
    }
}
