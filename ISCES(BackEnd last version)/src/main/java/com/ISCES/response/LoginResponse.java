package com.ISCES.response;


import com.ISCES.entities.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
// It is only for responsing the login status in http manners.
public class LoginResponse {
    private int status;
    private String message;
    private User user;

    public LoginResponse(int status, String message,User user) {
        this.status = status;
        this.message = message;
        this.user = user;

    }

	public LoginResponse(int status, String message) {
		this.status = status;
		this.message = message;
	}


}
