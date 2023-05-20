package com.example.restart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class DemoRestController {
    private Student student;
    private Election election;
    @Autowired
    public DemoRestController(Student student,Election election){
    this.student=student;
    this.election=election;
    }

    @GetMapping("/workout")
    public String getDailyWorkout(Student student){
        return student.getDailyWorkout();
    }

    @GetMapping("/students")
    private List<Student> loadData() {
        List<Student> list= new ArrayList<>();
        // create employees
        Student emp1 = new Student(1,"Emre","Karaduman", 3.5,"Computer Engineering","description1",25);
        Student emp2 = new Student(2,"Halil","Uyanik", 2.6,"Civil Engineering","description2",15);
        Student emp3 = new Student(3,"Gencay","Turgut", 3.2,"Computer Engineering","description3",20);
        Student emp4 = new Student(4,"Ahmet","Özdemir", 2.8,"Computer Engineering","description4",10);

        // create the list

        // add to the list
        list.add(emp1);
        list.add(emp2);
        list.add(emp3);
        list.add(emp4);
        return list;
    }

    @PostMapping("/electionDate")
    public String setElectionDate(@RequestBody String date){
        election.setDate(date);
        System.out.println(election);
        return date;
    }

}
