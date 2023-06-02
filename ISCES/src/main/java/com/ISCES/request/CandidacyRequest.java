package com.ISCES.request;

import com.ISCES.entities.Candidate;
import com.ISCES.entities.Student;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CandidacyRequest {
    private String message;
    private Student student;

    public CandidacyRequest(String message) {
        this.message = message;
    }

    public CandidacyRequest(String message, Student student) {
        this.message = message;
        this.student = student;
    }
}
