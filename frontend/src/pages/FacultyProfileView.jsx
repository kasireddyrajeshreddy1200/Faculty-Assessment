import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getFacultyProfile } from '../api/faculty.api';

const FacultyProfileView = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await getFacultyProfile();
    setProfile(data);
  };

  if (!profile) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <>
      <Navbar />

      <div style={styles.card}>
        <h2>My Profile</h2>

        <p><strong>Name:</strong> {profile.user.name}</p>
        <p><strong>Email:</strong> {profile.user.email}</p>
        <p><strong>Department:</strong> {profile.department}</p>
        <p><strong>Designation:</strong> {profile.designation}</p>
        <p><strong>Joining Date:</strong> {profile.joiningDate.slice(0, 10)}</p>
        <p><strong>Qualifications:</strong> {profile.qualifications}</p>

        <button style={styles.btn} onClick={() => navigate('/faculty')}>
          Back to Dashboard
        </button>
      </div>
    </>
  );
};

const styles = {
  card: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '25px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  btn: {
    marginTop: '20px',
    padding: '10px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    width: '100%'
  }
};

export default FacultyProfileView;
