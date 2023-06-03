import { useState } from "react";
import "./CandidateForm.css"
export default function CandidateForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [transcript, setTranscript] = useState("");
  const [criminalRecord, setCriminalRecord] = useState("");
  const [validCandidate, setValidCandidate] = useState(false);
  const [alertBoxContent, setAlertBoxContent] = useState("");
// user id'im ile aday adayı olmadığım belli olacak. eğer ispending ise değiştir olacak. eğer kabulsem sayfada zaten adaysın yazacak. 
  function submitHandler(e) {
    e.preventDefault();
    if (name && surname && transcript && criminalRecord) {
      const candidateData = {
        name,
        surname,
        transcript,
        criminalRecord,
      };
      console.log("Gönderilen veriler: ", candidateData);
      setName("");
      setSurname("");
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
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <br />
        <label className="form-label">
          Transcript of Records:
          <input type="file" accept="application/pdf" onChange={(e) => setTranscript(e.target.files[0])} />
        </label>
        <br />
        <label className="form-label">
          Criminal Record:
          <input type="file" accept="application/pdf" onChange={(e) => setCriminalRecord(e.target.files[0])} />
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
