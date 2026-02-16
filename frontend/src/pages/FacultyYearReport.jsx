import { useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const FacultyYearReport = () => {
  const [year, setYear] = useState('');
  const [report, setReport] = useState(null);
  const navigate = useNavigate();


const fetchReport = async () => {
  try {
    const res = await api.get(
      `/reports/faculty/${year}`
    );

    setReport(res.data);

  } catch (error) {
    console.log(error.response);
    alert("Failed to fetch report");
  }
};


  return (
    <>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <h2>My Year Report</h2>

        <input
          placeholder="Academic Year (e.g., 2024-25)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={fetchReport}>Get Report</button>

        {report && (
          <>
            <h3>Total Score: {report.totalScore}</h3>
            <h4>Contributions: {report.contributionCount}</h4>

            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {report.contributions.map((c) => (
                  <tr key={c._id}>
                    <td>{c.title}</td>
                    <td>{c.category}</td>
                    <td>{c.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <br />
        <button
  onClick={() => navigate('/faculty')}
  style={{
    marginBottom: '20px',
    padding: '8px 12px',
    background: '#64748b',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }}
>
  ← Back to Dashboard
</button>

      </div>
    </>
  );
};

export default FacultyYearReport;
