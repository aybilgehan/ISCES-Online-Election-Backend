package com.ISCES.response;


import com.ISCES.entities.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
// It is only for responsing the login status in http manners.
public class LoginResponse { // we can change it .
    private int status;
    private String message;
    private Student student;
    private Candidate candidate;
    private Admin admin;
    private String role;

    public LoginResponse(int status, String message,Student student) { //  response for student's login.
        this.status = status;
        this.message = message;
        this.student = student;
        this.role = "student";

    }

    public LoginResponse(int status, String message,Candidate candidate) { // response for candidate's login.
        this.status = status;
        this.message = message;
        this.candidate = candidate;
        this.role = "candidate";

    }

    public LoginResponse(int status, String message, Admin admin) { // response for officer's login.
        this.status = status;
        this.message = message;
        this.admin = admin;
        if(admin.getUser().getRole().equals("officer")) {
            this.role = "officer";
        }
        else if(admin.getUser().getRole().equals("rector")){
            this.role = "rector";
        }
    }


    public LoginResponse(int status, String message) { //  response for failed login.
        this.status = status;
        this.message = message;
    }


}
