import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin 👋</p>

        <button
          style={styles.primaryBtn}
          onClick={() => navigate('/admin/register')}
        >
          Register Faculty / Evaluator
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
  
  primaryBtn: {
    padding: '12px 20px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px'
  }
};

export default AdminDashboard;
