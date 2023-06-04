package com.ISCES.request;

import com.ISCES.entities.Election;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Data
public class ElectionRequest {

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", shape = JsonFormat.Shape.STRING)
    private LocalDateTime startDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", shape = JsonFormat.Shape.STRING)
    private LocalDateTime endDate;

    private Boolean isStarted;

    public ElectionRequest(LocalDateTime startDate,LocalDateTime endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public ElectionRequest() {
    }

    public ElectionRequest(Boolean isStarted) {
        this.isStarted = isStarted;
    }
}
