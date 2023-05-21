package com.example.restart;

import org.springframework.stereotype.Component;

@Component
public class Student  implements User {

    private int id;
    private String firstName;
    private String lastName;

    private double gpa;

    private String department;

    private String description;

    private int currentVote;


    public Student() {
    }

    public Student(int id, String firstName, String lastName, double gpa, String department, String description, int currentVote) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gpa = gpa;
        this.department = department;
        this.description = description;
        this.currentVote = currentVote;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public double getGpa() {
        return gpa;
    }

    public void setGpa(double gpa) {
        this.gpa = gpa;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCurrentVote() {
        return currentVote;
    }

    public void setCurrentVote(int currentVote) {
        this.currentVote = currentVote;
    }

    @Override
    public String getDailyWorkout() {
        return "says hi";
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", gpa=" + gpa +
                ", department='" + department + '\'' +
                ", description='" + description + '\'' +
                ", current vote=" + currentVote +
                '}';
    }
}
