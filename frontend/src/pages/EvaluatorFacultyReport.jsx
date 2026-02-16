import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const EvaluatorFacultyReport = () => {
  const navigate = useNavigate();

  const [facultyList, setFacultyList] = useState([]);
  const [facultyId, setFacultyId] = useState('');
  const [year, setYear] = useState('');
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await api.get('/auth/faculty-list');
      setFacultyList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReport = async () => {
    try {
      const res = await api.get(
        `/reports/faculty-report/${facultyId}/${year}`
      );
      setReport(res.data);
    } catch (error) {
      alert('Failed to fetch report');
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: '30px' }}>
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate('/evaluator')}
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

        <h2>Faculty Year Report</h2>

        {/* Faculty Dropdown */}
        <select
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
        >
          <option value="">Select Faculty</option>
          {facultyList.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name} ({f.email})
            </option>
          ))}
        </select>

        <br /><br />

        {/* Academic Year Input */}
        <input
          placeholder="Academic Year (e.g., 2025-2026)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <br /><br />

        <button onClick={fetchReport}>
          Get Report
        </button>

        {/* Report Display */}
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
      </div>
    </>
  );
};

export default EvaluatorFacultyReport;
