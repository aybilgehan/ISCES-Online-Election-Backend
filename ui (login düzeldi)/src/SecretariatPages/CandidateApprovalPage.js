import React, { useState } from 'react';

const CandidateApprovalPage = () => {
  // Fetch candidates with their motivation text, transcript of records, and criminal record
  // Provide dummy data for now
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Candidate 1",
    },
    {
      id: 2,
      name: "Candidate 2",
    },
    {
      id: 3,
      name: "Candidate 3",
    },
  ]);

  const approveCandidate = (id) => {
    // Remove the approved candidate from the list
    const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
    setCandidates(updatedCandidates);

    // TODO: Send the approved candidate to the backend for further processing
  };

  const rejectCandidate = (id) => {
    // Remove the rejected candidate from the list
    const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
    setCandidates(updatedCandidates);

    // TODO: Send the rejected candidate to the backend for further processing
  };

  return (
    <div>
      {candidates.map(candidate => (
        <div key={candidate.id}>
          <h3>{candidate.name}</h3>
          <button onClick={() => approveCandidate(candidate.id)}>Approve</button>
          <button onClick={() => rejectCandidate(candidate.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default CandidateApprovalPage;
