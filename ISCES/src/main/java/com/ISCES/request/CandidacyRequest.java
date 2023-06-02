package com.ISCES.request;

import com.ISCES.entities.Candidate;
import com.ISCES.entities.Student;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CandidacyRequest {
    private String message;
    private Candidate candidate;

    public CandidacyRequest(String message) {
        this.message = message;
    }

    public CandidacyRequest(String message, Candidate candidate) {
        this.message = message;
        this.candidate = candidate;
    }
}
