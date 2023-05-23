import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CandidateCard from "./CandidateCard";
import AuthContext from "../context/AuthContext";
import axios from "axios";

//candidatelar liste olarak çekilecek.(tik) her bir candidate'ın idsinden departmantlar çekilecek ve bizim aktif kullanıcımızın departmanı ile eşleşenler listelenecek.localhost:8080/getdepartment/authctx.id=== localhost:8080/getdepartment/candidate.id
//kullanıcı oy kullandığında isvoted true olacak ve candidate'ın currentvote'u 1 artacak.
//localhost:8080/incrementvote/candidate.id
//localhost:8080/isvoted/authctx.id


export default function Candidates() {
  const authCtx = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [studentDepartment, setStudentDepartment] = useState("");
  const url = "http://localhost:8080/students"; //students değil candidates olacak
  const studentId = localStorage.getItem("uid");
  const studentUrl = `http://localhost:8080/students/getdepartmentid/${studentId}`;
  useEffect(() => {
    fetchCandidateInfo();
    fetchStudentInfo();
  }, []);
  console.log(authCtx.isVoted)
  const fetchStudentInfo = async () => {
    try {
      const response = await axios.get(studentUrl);
      setStudentDepartment(response.data.department); //burayı gelen bilgiye göre ayarlarız
    }catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const fetchCandidateInfo = async () => {
    try {
      const response = await axios.get(url);
      const filteredCandidates = response.data.filter(
        (candidate) => candidate.department === studentDepartment
      );
      setCandidates(filteredCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const voteHandler = async (id) => {
    try{
      const response = await axios.get(`http://localhost:8080/students/isvoted/${id}`);
      if(response.data===true){
        console.log("This user has already voted.");
        return;
      }
      else{
        console.log(id, "id'sine sahip kullanici 1 oy kazandı")
        const response1 = await axios.put(`http://localhost:8080/students/setisvoted/${id}`);
        const response2 = await axios.put(`http://localhost:8080/candidates/incrementvote/${id}`);
      }
  }
  catch (error) {
  console.error("Voting  :", error);
}
  }

  return (
    <div className="container">
      <ul>
        {candidates.map((candidate, index) => (
          <li className="list-item" key={index}>
            {candidate.id}
            {candidate.photo}
            {candidate.firstName}
            {candidate.gpa}
            {candidate.department}
            {candidate.description}
            {candidate.currentVote}
            <button onClick={() => voteHandler(candidate.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
