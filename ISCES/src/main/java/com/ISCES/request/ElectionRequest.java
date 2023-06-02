package com.ISCES.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ElectionRequest {
    private LocalDate electionDate;

    public ElectionRequest(LocalDate electionDate) {
        this.electionDate = electionDate;
    }
}
