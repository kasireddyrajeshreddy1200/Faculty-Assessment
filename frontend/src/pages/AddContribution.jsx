import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContribution } from '../api/contribution.api';
import Navbar from '../components/Navbar';

const AddContribution = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    academicYear: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createContribution(form);
    alert('Contribution submitted');
    navigate('/faculty/contributions');
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>Add Contribution</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <select name="category" required onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="TEACHING">Teaching</option>
            <option value="RESEARCH">Research</option>
            <option value="ADMINISTRATION">Administration</option>
            <option value="EXTENSION">Extension</option>
          </select>

          <input name="title" placeholder="Title" required onChange={handleChange} />
          <textarea name="description" placeholder="Description" onChange={handleChange} />
          <input name="academicYear" placeholder="2023-2024" required onChange={handleChange} />

          <button type="submit">Submit</button>
          <button type="button" onClick={() => navigate('/faculty')}>
            Back
          </button>
        </form>
      </div>
    </>
  );
};

const styles = {
  container: { maxWidth: '500px', margin: '40px auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' }
};

export default AddContribution;
