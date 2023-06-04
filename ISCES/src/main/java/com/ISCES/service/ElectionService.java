package com.ISCES.service;

import com.ISCES.entities.Election;
import com.ISCES.repository.ElectionRepo;
import com.ISCES.request.ElectionRequest;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ElectionRequest> isStartedElection(){
        LocalDateTime now = LocalDateTime.now(); // currentdate
        Election currentElection = electionRepo.findByIsFinished(false);
        Boolean isElectionStarted = null;
        if(currentElection != null){
            isElectionStarted = now.isAfter(currentElection.getStartDate()) && now.isBefore(currentElection.getEndDate());
        }
        try {
            return new ResponseEntity<>(new ElectionRequest(isElectionStarted), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new ElectionRequest(),HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ElectionRequest> isFinishedElection(){
        LocalDateTime now = LocalDateTime.now(); // currentdate
        Election currentElection = electionRepo.findByIsFinished(false);
        Boolean isElectionFinished = null;
        if(currentElection != null){
            isElectionFinished = now.isBefore(currentElection.getStartDate()) && now.isAfter(currentElection.getEndDate());
        }
        try {
            return new ResponseEntity<>(new ElectionRequest(isElectionFinished), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new ElectionRequest(),HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public boolean isThereStartedElection() {
        return electionRepo.findByIsFinished(false) != null;
    }
}
