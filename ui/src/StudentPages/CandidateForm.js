import { useContext, useState } from "react";
import "./CandidateForm.css";
import axios from "axios";
export default function CandidateForm() {
  const studentNum = localStorage.getItem("uid")
  const [motivationText, setMotivationText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [criminalRecord, setCriminalRecord] = useState("");
  const [validCandidate, setValidCandidate] = useState(false);
  const [alertBoxContent, setAlertBoxContent] = useState("");
  // user id'im ile aday adayı olmadığım belli olacak. eğer ispending ise değiştir olacak. eğer kabulsem sayfada zaten adaysın yazacak.
  const apply = async (candidateData)=> {
    console.log(candidateData);
    try {
      const response = await axios.post(
        `http://localhost:8080/applyToBeCandidate/`,
      candidateData);
    } catch (error) {
      console.error(error)
    }
  };
  function submitHandler(e) {
    e.preventDefault();
    if (transcript && criminalRecord && motivationText) {
      const candidateData = {
        studentNum,
        motivationText,
        transcript,
        criminalRecord,
      };
      apply(candidateData);
      setMotivationText("");
      setTranscript("");
      setCriminalRecord("");
      setValidCandidate(true);
      setAlertBoxContent("Başvurunuz başarıyla alınmıştır.");
    } else {
      setValidCandidate(false);
      setAlertBoxContent("Lütfen tüm bilgileri doldurun.");
    }
  }

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <label className="form-label">
          Your motivation to become a candidate:
          <input
            type="text"
            value={motivationText}
            onChange={(e) => setMotivationText(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label className="form-label">
          Transcript of Records:
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setTranscript(e.target.files[0])}
          />
        </label>
        <br />
        <label className="form-label">
          Criminal Record:
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setCriminalRecord(e.target.files[0])}
          />
        </label>
        <br />
        <button type="submit">Be Candidate</button>
      </form>
      {validCandidate ? (
        <div style={{ color: "green" }}>{alertBoxContent}</div>
      ) : (
        <div style={{ color: "red" }}>{alertBoxContent}</div>
      )}
    </div>
  );
}
