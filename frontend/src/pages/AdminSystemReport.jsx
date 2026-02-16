import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AdminSystemReport = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get('/reports/system');
    setData(res.data);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <h2>System Report</h2>

        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Academic Year</th>
              <th>Total Contributions</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row._id}</td>
                <td>{row.totalContributions}</td>
                <td>{row.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
  onClick={() => navigate('/admin')}
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
    </>
  );

  

};

export default AdminSystemReport;
