import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EvaluatorDashboard = () => {
  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>Evaluator Dashboard</h2>

        <div style={styles.actions}>
          <Link to="pending" style={styles.link}>
            View Pending Contributions
          </Link>

          <Link to="final" style={styles.link}>
            Create Final Evaluation
          </Link>
        </div>

        <Outlet />
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '30px'
  },
  actions: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px'
  },
  link: {
    padding: '10px 16px',
    background: '#2563eb',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px'
  }
};

export default EvaluatorDashboard;
