import { useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AdminCategoryReport = () => {
  const [year, setYear] = useState('');
  const [data, setData] = useState([]);
 const navigate = useNavigate();

  const fetchReport = async () => {
    try{
    const res = await api.get(`/reports/category/${year}`);
    setData(res.data);
  }catch (error) {
    alert("Failed to fetch report");
  }
};

  return (
    <>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <h2>Category Summary</h2>

        <input
          placeholder="Academic Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <br></br> <br></br>
        <button onClick={fetchReport}>Get Summary</button>

        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Contributions</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row._id}</td>
                <td>{row.count}</td>
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

export default AdminCategoryReport;
