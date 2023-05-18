package com.example.ProjeDenemem.service;

import com.example.ProjeDenemem.model.Candidate;
import com.example.ProjeDenemem.model.Representative;

import java.util.List;

public interface RepresentativeService {
    public Representative saveRepresentative(Representative representative);
    public List<Representative> getAllRepresentatives();
}
