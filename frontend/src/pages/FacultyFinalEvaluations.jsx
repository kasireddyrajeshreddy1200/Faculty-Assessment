import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getMyFinalEvaluations } from '../api/faculty.api';
import { useNavigate } from 'react-router-dom';

const FacultyFinalEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]); // ✅ default empty array
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getMyFinalEvaluations(); // ✅ data directly
      setEvaluations(data || []); // ✅ safety fallback
    } catch (error) {
      console.error(error);
      setEvaluations([]); // prevent crash
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px' }}>
        <h2>My Final Evaluations</h2>

        {evaluations.length === 0 ? (
          <p>No final evaluations yet.</p>
        ) : (
          <table border="1" width="100%">
            <thead>
              <tr>
                <th>Academic Year</th>
                <th>Total Score</th>
                <th>Remarks</th>
                <th>Evaluated By</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((e) => (
                <tr key={e._id}>
                  <td>{e.academicYear}</td>
                  <td>{e.totalScore}</td>
                  <td>{e.remarks}</td>
                  <td>{e.evaluator?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <br />
        <button onClick={() => navigate('/faculty')}>
          Back to Dashboard
        </button>
      </div>
    </>
  );
};

export default FacultyFinalEvaluations;
