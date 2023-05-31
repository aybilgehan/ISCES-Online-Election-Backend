package com.ISCES.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteResponse {

    private String message;
    private Long studentNumber;

    public VoteResponse(String message, Long studentNumber) {
        this.message = message;
        this.studentNumber = studentNumber;
    }

    public VoteResponse(String message) {
        this.message = message;
    }
}
