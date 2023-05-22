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
    String userType;

    public LoginResponse(int status, String message, String path,String userType) {
        this.status = status;
        this.message = message;
        this.dateTimeObject = new Date().getTime();
        this.path = path;
        this.userType = userType;
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

	public String getUserType() {
		return userType;
	}
    
    
}
