import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const PendingContributions = () => {
  const [contributions, setContributions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPending = async () => {
      const res = await api.get('/evaluations/pending');
      setContributions(res.data);
    };
    fetchPending();
  }, []);

  return (
    <div>
      <h3>Pending Contributions</h3>

      {contributions.map((c) => (
        <div key={c._id} style={styles.card}>
        <p>
            <strong>Faculty:</strong>{' '}
            {c.faculty ? c.faculty.name : 'Faculty record missing'}
        </p>

          <p><strong>Title:</strong> {c.title}</p>

          <button
            onClick={() =>
                navigate(`/evaluator/evaluate/${c._id}`, {
                state: { contribution: c }
                })
            }
            >
            Evaluate
            </button>

        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '10px'
  }
};

export default PendingContributions;
