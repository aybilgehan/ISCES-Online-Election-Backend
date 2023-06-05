package com.ISCES.service;

import com.ISCES.entities.Election;
import com.ISCES.repository.ElectionRepo;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Service
public class ElectionService {
    private ElectionRepo electionRepo;

    @Autowired
    public ElectionService(ElectionRepo electionRepo) {
        this.electionRepo = electionRepo;
    }


    @Transactional
    public Election save(Election election){
        return electionRepo.save(election);
    }

    @Transactional
    public List<Election> getAllElections(){
        return electionRepo.findAll();
    }

    @Transactional
    public Election findByIsFinished(boolean isFinished){
        return electionRepo.findByIsFinished(isFinished);
    }



    @Transactional
    public boolean isThereStartedElection() {
        LocalDateTime now = LocalDateTime.now();
        return electionRepo.findByIsFinished(false) != null && electionRepo.findByIsFinished(false).getStartDate().isBefore(now) && electionRepo.findByIsFinished(false).getEndDate().isAfter(now);
    } //  checks for is there any election that initialize by rector.


}
