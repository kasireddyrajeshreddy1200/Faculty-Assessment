import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const EditContribution = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    academicYear: '',
    proofFiles: []
  });

  const [newFiles, setNewFiles] = useState([]);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContribution();
  }, []);

  const fetchContribution = async () => {
    const res = await api.get('/contributions');
    const contribution = res.data.find(c => c._id === id);
    setForm(contribution);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRemoveExisting = (filePath) => {
    setFilesToRemove([...filesToRemove, filePath]);
    setForm({
      ...form,
      proofFiles: form.proofFiles.filter(f => f.filePath !== filePath)
    });
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setNewFiles(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('category', form.category);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('academicYear', form.academicYear);

      formData.append('filesToRemove', JSON.stringify(filesToRemove));

      newFiles.forEach(file => {
        formData.append('proofFiles', file);
      });

      await api.put(`/contributions/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Updated successfully');
      navigate('/faculty/contributions');

    } catch (err) {
      setError(err.response?.data?.message || 'Error updating');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
        <h2>Edit Contribution</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          <input name="title" value={form.title} onChange={handleChange} />

          <textarea name="description" value={form.description} onChange={handleChange} />

          <input name="academicYear" value={form.academicYear} onChange={handleChange} />

          

          <h4>Existing Files</h4>

          {form.proofFiles?.length === 0 && <p>No files uploaded</p>}

          {form.proofFiles?.map((file, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{file.fileName}</span>
              <button
                type="button"
                onClick={() => handleRemoveExisting(file.filePath)}
              >
                Remove
              </button>
            </div>
          ))}

          <h4>Add New Files</h4>
          <input type="file" multiple onChange={handleFileChange} />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Update Contribution</button>
        </form>
      </div>
    </>
  );
};

export default EditContribution;
