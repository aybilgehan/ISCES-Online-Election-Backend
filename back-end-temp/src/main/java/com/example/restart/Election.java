package com.example.restart;

import org.springframework.stereotype.Component;

@Component
public class Election {
    private String date;

    public Election() {
    }

    public Election(String date) {
        this.date = date;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Election{" +
                "date='" + date + '\'' +
                '}';
    }
}
