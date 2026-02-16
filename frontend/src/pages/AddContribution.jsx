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

  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
  const newFiles = Array.from(e.target.files);

  const updatedFiles = [...files, ...newFiles];

  if (updatedFiles.length > 3) {
    setError('Maximum 3 files allowed');
    return;
  }

  setFiles(updatedFiles);
  setError('');
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      setError('At least one proof file is required');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('category', form.category);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('academicYear', form.academicYear);

      files.forEach((file) => {
        formData.append('proofFiles', file);
      });

      await createContribution(formData);

      alert('Contribution submitted successfully');
      navigate('/faculty/contributions');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
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

          {/* File Upload */}
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
          />

          {files.length > 0 && (
  <div>
    <p><strong>Selected Files:</strong></p>
    {files.map((file, index) => (
      <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{file.name}</span>
        <button
          type="button"
          onClick={() =>
            setFiles(files.filter((_, i) => i !== index))
          }
        >
          Remove
        </button>
      </div>
    ))}
  </div>
)}


          {error && <p style={{ color: 'red' }}>{error}</p>}

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
