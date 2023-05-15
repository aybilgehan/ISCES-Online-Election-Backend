function Election() {
    const candidates = [
      { name: "Emre Karaduman", gpa: 3.5, department: "Computer Engineering", description: "dsjkasdjaddaksasasdassd", currentVote: 25 },
      { name: "Halil Uyanik", gpa: 2.6, department: "Civil Engineering", description: "ds132312312312sdassd", currentVote: 15 },
      { name: "Gencay Turgut", gpa: 3.2, department: "Computer Engineering", description: "dfsdfgsdfwef1", currentVote: 20 },
      { name: "Ahmet Özdemir", gpa: 2.8, department: "Computer Engineering", description: "adfsgfgddgdf", currentVote: 10 }
    ];
  
    const totalVotes = candidates.reduce((acc, candidate) => acc + candidate.currentVote, 0);
    
    const sortedCandidates = [...candidates].sort((a, b) => b.currentVote - a.currentVote);
  
    return (
      <div>
        <ul>
          {sortedCandidates.map((candidate) => (
            <li key={candidate.name}>
              {candidate.name} - {((candidate.currentVote / totalVotes) * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Election;
  