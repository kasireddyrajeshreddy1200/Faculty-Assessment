import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getEvaluatorProfile, saveEvaluatorProfile } from '../api/evaluator.api';

const EvaluatorProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    department: '',
    designation: '',
    joiningDate: '',
    qualifications: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getEvaluatorProfile();
      setForm({
        department: data.department,
        designation: data.designation,
        joiningDate: data.joiningDate?.slice(0, 10),
        qualifications: data.qualifications
      });
    } catch {
      console.log('No profile yet');
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveEvaluatorProfile(form);
    navigate('/evaluator/profile/view');
  };

  return (
    <>
      <Navbar />
      <div style={styles.card}>
        <h2>Edit Evaluator Profile</h2>

        <form onSubmit={handleSubmit}>
          <input name="department" value={form.department} onChange={handleChange} required />
          <input name="designation" value={form.designation} onChange={handleChange} required />
          <input type="date" name="joiningDate" value={form.joiningDate} onChange={handleChange} required />
          <input name="qualifications" value={form.qualifications} onChange={handleChange} />

          <button type="submit" style={styles.saveBtn}>Save</button>
          <button type="button" style={styles.backBtn} onClick={() => navigate('/evaluator')}>
            Back
          </button>
        </form>
      </div>
    </>
  );
};

const styles = {
  card: {
    maxWidth: '420px',
    margin: '40px auto',
    padding: '25px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  saveBtn: {
    background: '#2563eb',
    color: '#fff',
    padding: '10px',
    border: 'none',
    width: '100%',
    marginTop: '10px'
  },
  backBtn: {
    background: '#6b7280',
    color: '#fff',
    padding: '10px',
    border: 'none',
    width: '100%',
    marginTop: '10px'
  }
};

export default EvaluatorProfile;
