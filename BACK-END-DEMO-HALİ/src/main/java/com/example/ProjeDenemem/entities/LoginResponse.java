package com.example.ProjeDenemem.entities;



import java.util.Date;

import lombok.Data;

@Data
// It is only for responsing the login status in http manners.
public class LoginResponse {
    int status;
    String message;
    long dateTimeObject;
    String path;
    User user;

    public LoginResponse(int status, String message, String path,User user) {
        this.status = status;
        this.message = message;
        this.path = path;
        this.user = user;
    }

	public LoginResponse(int status, String message, String path) {
		this.status = status;
		this.message = message;
		this.path = path;
	}

	public int getStatus() {
		return status;
	}

	public String getMessage() {
		return message;
	}

	public long getDateTimeObject() {
		return dateTimeObject;
	}

	public String getPath() {
		return path;
	}

	public User getUser() {
		return user;
	}
    
    
}
