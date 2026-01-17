import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth.api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser({ email, password });

      login(data.token);

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const role = payload.role;

      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'EVALUATOR') navigate('/evaluator');
      else navigate('/faculty');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Faculty Assessment System</h2>

        {error && <p style={styles.error}>{error}</p>}

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

/* 🔹 Simple Inline Styles (No CSS file needed) */
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8'
  },
  form: {
    width: '350px',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '600'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center'
  }
};

export default Login;
