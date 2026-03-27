import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContribution } from '../api/contribution.api';
import Navbar from '../components/Navbar';

const AddContribution = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    academicYear: ''
  });

  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...files, ...newFiles];

    if (updatedFiles.length > 3) {
      setMessage({ type: 'danger', text: 'Maximum 3 files allowed' });
      return;
    }

    setFiles(updatedFiles);
    setMessage({ type: '', text: '' });
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      setMessage({ type: 'danger', text: 'At least one proof file is required' });
      return;
    }

    setSubmitting(true);
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

      setMessage({ type: 'success', text: 'Contribution submitted successfully! ✓' });
      setTimeout(() => navigate('/faculty/contributions'), 1500);
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Something went wrong' });
    } finally {
      setSubmitting(false);
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
                <span className="text-white font-bold text-xl">🎯</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-100">Add Contribution</h1>
                <p className="text-slate-400 mt-1">Share your academic achievements and contributions</p>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="card animate-fade-in border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl">
            {message.text && (
              <div className={`alert alert-${message.type} mb-6 rounded-lg`}>
                {message.type === 'success' ? (
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category */}
              <div className="form-group">
                <label className="block mb-2 font-semibold text-neutral-700">Contribution Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white"
                >
                  <option value="">Select a category...</option>
                  <option value="TEACHING">🎓 Teaching</option>
                  <option value="RESEARCH">🔬 Research</option>
                  <option value="ADMINISTRATION">🏛️ Administration</option>
                  <option value="EXTENSION">📚 Extension</option>
                </select>
              </div>

              {/* Title */}
              <div className="form-group">
                <label className="block mb-2 font-semibold text-neutral-700">Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Published Paper on AI"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white"
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="block mb-2 font-semibold text-neutral-700">Description</label>
                <textarea
                  name="description"
                  placeholder="Provide details about your contribution..."
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white h-32"
                />
              </div>

              {/* Academic Year */}
              <div className="form-group">
                <label className="block mb-2 font-semibold text-neutral-700">Academic Year *</label>
                <input
                  type="text"
                  name="academicYear"
                  placeholder="e.g., 2023-2024"
                  value={form.academicYear}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white"
                />
              </div>

              {/* File Upload */}
              <div className="form-group">
                <label className="block mb-3 font-semibold text-neutral-700">Proof Documents *</label>
                <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 text-center hover:bg-primary-50 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                    className="hidden"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer block">
                    <svg className="w-12 h-12 text-primary-400 mx-auto mb-2 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-neutral-600 font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-neutral-500 mt-1">PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 3 files)</p>
                  </label>
                </div>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                  <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    Selected Files ({files.length}/3)
                  </h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded border border-neutral-200">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 16.5a1 1 0 11-2 0 1 1 0 012 0zM15 7a2 2 0 11-4 0 2 2 0 014 0zM12.5 1a1.5 1.5 0 00-3 0v1.6a4 4 0 00.8 2.4L8 7.5a1 1 0 000 1.414l2.3 2.3a4 4 0 002.4.8h1.6a1.5 1.5 0 000-3h-1.6a2 2 0 01-1.414-.586L10 9.414 7.707 7.12a4 4 0 01.8-2.4V1z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-neutral-900">{file.name}</p>
                            <p className="text-xs text-neutral-500">{(file.size / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-danger-600 hover:bg-danger-50 p-2 rounded transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 pt-4 border-t border-neutral-200">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn btn-primary relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className={submitting ? 'opacity-0' : 'opacity-100 transition-opacity'}>
                    Submit Contribution
                  </span>
                  {submitting && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/faculty')}
                  className="flex-1 btn btn-outline border-neutral-300 text-neutral-600 hover:bg-neutral-50 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
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

export default AddContribution;
