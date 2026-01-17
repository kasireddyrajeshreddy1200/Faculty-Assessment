import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user.api';

const RegisterUser = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'FACULTY'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      setMessage('User created successfully');
      setForm({ name: '', email: '', password: '', role: 'FACULTY' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2>Create User</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="FACULTY">Faculty</option>
            <option value="EVALUATOR">Evaluator</option>
          </select>

          <button type="submit">Create User</button>
        </form>

        <button
          style={styles.backBtn}
          onClick={() => navigate('/admin')}
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  card: {
    width: '350px',
    padding: '25px',
    border: '1px solid #ddd',
    textAlign: 'center'
  },
  backBtn: {
    marginTop: '15px',
    background: '#64748b',
    color: '#fff',
    border: 'none',
    padding: '8px'
  }
};

export default RegisterUser;
