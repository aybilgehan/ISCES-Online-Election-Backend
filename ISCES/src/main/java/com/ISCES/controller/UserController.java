package com.ISCES.controller;


import com.ISCES.entities.*;
import com.ISCES.response.LoginResponse;
import com.ISCES.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import java.time.LocalDateTime;
import java.util.List;


@RestController
@CrossOrigin("http://localhost:3000")
public class UserController { // Bütün return typeler değişebilir . Response ve Request packageına yeni classlar eklenmeli frontendden hangi bilgi istendiğine göre


    private UserService userService;
    private CandidateService candidateService;

    private StudentService studentService;
    private AdminService adminService;
    private ElectionService electionService;


    @Autowired
    public UserController(UserService userService, CandidateService candidateService, StudentService studentService, AdminService adminService, ElectionService electionService) {
        this.userService = userService;
        this.candidateService = candidateService;
        this.studentService = studentService;
        this.adminService = adminService;
        this.electionService = electionService;
    }



    @GetMapping("/users")
    public List<User> getAllUsers(){

        return userService.getAllUsers();
    }


    @GetMapping("/login/{email}/{password}")// user logins with email and password
    public ResponseEntity<LoginResponse> login(@PathVariable String email, @PathVariable String password) {
        LocalDateTime now = LocalDateTime.now(); // currentdate
        String controller = "";// message for frontend  (Logged-in )
        User user = userService.findByEmail(email);
        Election currentElection = electionService.findByIsFinished(false);
        Boolean isElectionStarted = null;
        if(currentElection != null){
            isElectionStarted = now.isAfter(currentElection.getStartDate()) && now.isBefore(currentElection.getEndDate());
        }
        if (user != null && user.getPassword().equals(password)){
            controller = "Logged-in";
        }
        try {
                if((controller.equals("Logged-in"))){
                    if(user.getRole().equals("student")) { //  login response for student
                        // Http status 2**
                        Student student = studentService.findByUser_Email(email);
                        return new ResponseEntity<>(new LoginResponse(200, controller, student,isElectionStarted), HttpStatus.OK);
                    }
                    else if(user.getRole().equals("candidate")){ //  login response for candidate
                        Student student = studentService.findByUser_Email(email);
                        Candidate candidate = candidateService.findByStudent_StudentNumber(student.getStudentNumber());
                        return new ResponseEntity<>(new LoginResponse(200, controller, candidate,isElectionStarted), HttpStatus.OK);
                    }
                    else if(user.getRole().equals("officer")){ //  login response for candidate
                        Admin officer = adminService.findByUser_Email(email);
                        return new ResponseEntity<>(new LoginResponse(200, controller, officer,isElectionStarted), HttpStatus.OK);
                    }

                    else if(user.getRole().equals("rector")){ //  login response for candidate
                        Admin rector = adminService.findByUser_Email(email);
                        return new ResponseEntity<>(new LoginResponse(200, controller, rector,isElectionStarted), HttpStatus.OK);
                    }

            }

            else {
                // Http status 4**
                return new ResponseEntity<>(new LoginResponse(400, "Invalid Requests"), HttpStatus.BAD_REQUEST);
            }
        }
        catch (UsernameNotFoundException exception){
            return new ResponseEntity<>(new LoginResponse(400, "Email does not exists!"), HttpStatus.BAD_REQUEST);
        }
        return null;
    }



    @GetMapping("/isElectionStarted")
    public Boolean checkElectionInitialization(){
        return electionService.isThereStartedElection();
    }



}
