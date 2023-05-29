package com.example.ProjeDenemem.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name="candidate")
public class Candidate{

    @Id
    @Column(name = "candidate_id")
    private Long candidateID;

    @Column(name="votes")
    private Long votes;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name="candidate_name")
    private String candidateName;

}
