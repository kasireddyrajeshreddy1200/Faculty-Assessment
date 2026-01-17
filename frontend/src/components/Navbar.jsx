import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={styles.navbar}>
      <h3>Faculty Assessment System</h3>
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 30px',
    backgroundColor: '#1e293b',
    color: '#fff'
  },
  logoutBtn: {
    background: '#ef4444',
    border: 'none',
    color: '#fff',
    padding: '8px 14px',
    cursor: 'pointer'
  }
};

export default Navbar;
