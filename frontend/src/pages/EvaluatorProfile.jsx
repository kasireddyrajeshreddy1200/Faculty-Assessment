import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getEvaluatorProfile, saveEvaluatorProfile } from '../api/evaluator.api';

const EvaluatorProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);

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
      const data = await getEvaluatorProfile();
      setForm({
        department: data.department,
        designation: data.designation,
        joiningDate: data.joiningDate?.slice(0, 10),
        qualifications: data.qualifications
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
      await saveEvaluatorProfile(form);
      setMessage({ type: 'success', text: 'Profile saved successfully! ✓' });
      setTimeout(() => navigate('/evaluator/profile/view'), 1500);
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
                <h1 className="text-3xl font-bold text-slate-100">Edit Evaluator Profile</h1>
                <p className="text-slate-400 mt-1">Update your professional information</p>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="card animate-fade-in border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8">
            {message.text && (
              <div className={`alert alert-${message.type} mb-6 rounded-lg`}>
                {message.text}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="spinner"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label className="block mb-2 font-semibold text-slate-100">Department</label>
                  <input
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-slate-700 text-slate-100"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-semibold text-slate-100">Designation</label>
                  <input
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-slate-700 text-slate-100"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-semibold text-slate-100">Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={form.joiningDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-slate-700 text-slate-100"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-semibold text-slate-100">Qualifications</label>
                  <input
                    name="qualifications"
                    value={form.qualifications}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-slate-700 text-slate-100"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  <button type="submit" disabled={saving} className="btn btn-primary flex-1 disabled:opacity-70">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({department: '', designation: '', joiningDate: '', qualifications: ''})}
                    className="btn btn-outline text-slate-100 border-slate-600 hover:bg-slate-700 flex-1"
                  >
                    Reset
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

export default EvaluatorProfile;
