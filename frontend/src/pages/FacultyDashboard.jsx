import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const FacultyDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1>Faculty Dashboard</h1>

        <button style={styles.btn} onClick={() => navigate('/faculty/profile')}>
          Edit My Profile
        </button>

          <br /><br />

         <button onClick={() => navigate('/faculty/contributions')}>
          My Contributions
        </button>

          <br /><br />

        <button
          style={styles.btnSecondary}
          onClick={() => navigate('/faculty/profile/view')}
        >
          View My Profile
        </button>

        <br /><br />
        <button
  style={styles.btnSecondary}
  onClick={() => navigate('/faculty/final-evaluations')}
>
  View Final Evaluation Results
</button>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center'
  },
  btn: {
    padding: '12px 20px',
    margin: '10px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  btnSecondary: {
    padding: '12px 20px',
    margin: '10px',
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};

export default FacultyDashboard;
