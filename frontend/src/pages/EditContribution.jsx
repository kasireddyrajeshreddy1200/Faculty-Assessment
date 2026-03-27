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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-in-down">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">✏️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-100">Edit Contribution</h1>
                <p className="text-slate-400 mt-1">Update your academic contribution details</p>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="card animate-fade-in border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8">
            {error && (
              <div className="alert alert-danger mb-6 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label className="block mb-2 font-semibold text-slate-100">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-slate-700 text-slate-100"
                />
              </div>

              <div className="form-group">
                <label className="block mb-2 font-semibold text-slate-100">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-slate-700 text-slate-100"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label className="block mb-2 font-semibold text-slate-100">Academic Year</label>
                <input
                  name="academicYear"
                  value={form.academicYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-slate-700 text-slate-100"
                />
              </div>

              {/* Existing Files */}
              <div className="form-group">
                <label className="block mb-2 font-semibold text-slate-100">Existing Files</label>
                {form.proofFiles?.length === 0 ? (
                  <p className="text-slate-400">No files uploaded</p>
                ) : (
                  <div className="space-y-2">
                    {form.proofFiles?.map((file, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                        <span className="text-slate-100">{file.fileName}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExisting(file.filePath)}
                          className="btn btn-sm btn-danger"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add New Files */}
              <div className="form-group">
                <label className="block mb-2 font-semibold text-slate-100">Add New Files</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-slate-700 text-slate-100"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button type="submit" className="btn btn-primary flex-1">
                  Update Contribution
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/faculty/contributions')}
                  className="btn btn-outline text-slate-100 border-slate-600 hover:bg-slate-700 flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditContribution;
