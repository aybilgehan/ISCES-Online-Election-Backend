import { useState } from "react";

export default function CandidateForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [transcript, setTranscript] = useState("");
  const [criminalRecord, setCriminalRecord] = useState("");
  const [validCandidate, setValidCandidate] = useState(false);
  const [alertBoxContent, setAlertBoxContent] = useState("");

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
    <div>
      <form onSubmit={submitHandler}>
        <label>
          İsim:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Soyisim:
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </label>
        <br />
        <label>
          Transkript Belgesi:
          <input type="file" accept="application/pdf" onChange={(e) => setTranscript(e.target.files[0])} />
        </label>
        <br />
        <label>
          Adli Sicil Kaydı:
          <input type="file" accept="application/pdf" onChange={(e) => setCriminalRecord(e.target.files[0])} />
        </label>
        <br />
        <button type="submit">Aday Ol</button>
      </form>
      {validCandidate ? (
        <div style={{ color: "green" }}>{alertBoxContent}</div>
      ) : (
        <div style={{ color: "red" }}>{alertBoxContent}</div>
      )}
    </div>
  );
}
