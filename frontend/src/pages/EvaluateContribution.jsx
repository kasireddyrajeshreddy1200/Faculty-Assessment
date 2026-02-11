// import { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../api/axios';

// const EvaluateContribution = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [score, setScore] = useState('');
//   const [remarks, setRemarks] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await api.post(`/evaluations/${id}`, {
//       score,
//       remarks
//     });

//     alert('Contribution evaluated successfully');
//     navigate('/evaluator/pending');
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <h3>Evaluate Contribution</h3>

//       <input
//         type="number"
//         placeholder="Score (0–100)"
//         value={score}
//         onChange={(e) => setScore(e.target.value)}
//         required
//       />

//       <textarea
//         placeholder="Remarks"
//         value={remarks}
//         onChange={(e) => setRemarks(e.target.value)}
//       />

//       <button type="submit">Submit Evaluation</button>
//     </form>
//   );
// };

// const styles = {
//   form: {
//     maxWidth: '400px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '10px'
//   }
// };

// export default EvaluateContribution;


import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';

const EvaluateContribution = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [score, setScore] = useState('');
  const [remarks, setRemarks] = useState('');

  const contribution = location.state?.contribution;

  // Safety check
  if (!contribution) {
    return <p style={{ padding: '20px' }}>Contribution data not available</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post(`/evaluations/${id}`, {
      score,
      remarks
    });

    alert('Contribution evaluated successfully');
    navigate('/evaluator/pending');
  };

  return (
    <div style={styles.container}>
      {/* Contribution Details */}
      <div style={styles.card}>
        <h3>Contribution Details</h3>

        <p><strong>Faculty Name:</strong> {contribution.faculty?.name}</p>
        <p><strong>Email:</strong> {contribution.faculty?.email}</p>
        <p><strong>Category:</strong> {contribution.category}</p>
        <p><strong>Title:</strong> {contribution.title}</p>
        <p><strong>Description:</strong> {contribution.description}</p>
        <p><strong>Academic Year:</strong> {contribution.academicYear}</p>
      </div>

      {/* Evaluation Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Evaluate Contribution</h3>

        <input
          type="number"
          placeholder="Score (0–100)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          min="0"
          max="100"
          required
        />

        <textarea
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

        <button type="submit">Submit Evaluation</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '20px'
  },
  card: {
    background: '#f1f5f9',
    padding: '20px',
    borderRadius: '6px',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }
};

export default EvaluateContribution;
