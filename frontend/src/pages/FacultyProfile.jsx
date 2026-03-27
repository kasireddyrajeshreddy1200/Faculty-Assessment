import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getFacultyProfile, saveFacultyProfile } from '../api/faculty.api';

const FacultyProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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
    setLoading(true);
    try {
      const data = await getFacultyProfile();
      setForm({
        department: data.department || '',
        designation: data.designation || '',
        joiningDate: data.joiningDate?.slice(0, 10) || '',
        qualifications: data.qualifications || ''
      });
    } catch {
      console.log('No profile yet');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveFacultyProfile(form);
      setMessage({ type: 'success', text: 'Profile saved successfully! ✓' });
      setTimeout(() => navigate('/faculty/profile/view'), 1500);
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Error saving profile' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-in-down">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">📋</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-100">Edit Faculty Profile</h1>
                <p className="text-slate-400 mt-1">Update your professional information</p>
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

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="spinner"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label className="block mb-2 font-semibold text-neutral-700">Department</label>
                  <input
                    type="text"
                    name="department"
                    placeholder="e.g., Computer Science"
                    value={form.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-semibold text-neutral-700">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="e.g., Associate Professor"
                    value={form.designation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-semibold text-neutral-700">Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={form.joiningDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-semibold text-neutral-700">Qualifications</label>
                  <textarea
                    name="qualifications"
                    placeholder="e.g., PhD in Computer Science, B.Tech in Engineering..."
                    value={form.qualifications}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 btn btn-primary relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className={saving ? 'opacity-0' : 'opacity-100 transition-opacity'}>
                      Save Profile
                    </span>
                    {saving && (
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
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default FacultyProfile;
