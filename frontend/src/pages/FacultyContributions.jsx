import { useEffect, useState } from 'react';
import { getMyContributions, deleteContribution } from '../api/contribution.api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const FacultyContributions = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getMyContributions();
    setList(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete contribution?')) {
      await deleteContribution(id);
      loadData();
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px' }}>
        <h2>My Contributions</h2>

        <button onClick={() => navigate('/faculty/contributions/add')}>
          + Add Contribution
        </button>

        <table border="1" width="100%" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Year</th>
              <th>Status</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.category}</td>
                <td>{c.academicYear}</td>
                <td>{c.status}</td>
                <td>{c.score}</td>
                <td>
                  {c.status === 'PENDING' && (
                    <>
                      <button onClick={() => navigate(`/faculty/contributions/edit/${c._id}`)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(c._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <button onClick={() => navigate('/faculty')}>
          Back to Dashboard
        </button>
      </div>
    </>
  );
};

export default FacultyContributions;
