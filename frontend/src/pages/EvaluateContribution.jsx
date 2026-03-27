import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const EvaluateContribution = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [score, setScore] = useState('');
  const [remarks, setRemarks] = useState('');

  const contribution = location.state?.contribution;

  if (!contribution) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
          <div className="max-w-2xl mx-auto card text-center py-16 border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Data Not Available</h2>
            <p className="text-slate-400 mb-6">Contribution data could not be found. Please go back and try again.</p>
            <button
              onClick={() => navigate('/evaluator/pending')}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Pending
            </button>
          </div>
        </div>
      </>
    );
  }

  const handleDownload = async (fileIndex, fileName) => {
    try {
      const response = await api.get(
        `/contributions/file/${contribution._id}/${fileIndex}`,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to download file' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post(`/evaluations/${id}`, {
        score,
        remarks
      });
      setMessage({ type: 'success', text: 'Contribution evaluated successfully! ✓' });
      setTimeout(() => navigate('/evaluator/pending'), 1500);
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Error submitting evaluation' });
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      TEACHING: 'from-emerald-500 to-emerald-600',
      RESEARCH: 'from-blue-500 to-blue-600',
      ADMINISTRATION: 'from-purple-500 to-purple-600',
      EXTENSION: 'from-orange-500 to-orange-600',
    };
    return colors[category] || 'from-indigo-500 to-indigo-600';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      TEACHING: '🎓',
      RESEARCH: '🔬',
      ADMINISTRATION: '📋',
      EXTENSION: '📚',
    };
    return icons[category] || '📌';
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-in-down">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">⭐</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">Evaluate Contribution</h1>
                <p className="text-neutral-600 mt-1">Review and score this faculty contribution</p>
              </div>
            </div>
          </div>

          {message.text && (
            <div className={`alert alert-${message.type} mb-6 rounded-lg animate-slide-in-down`}>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Left: Contribution Details */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="card-header mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(contribution.category)} rounded-lg flex items-center justify-center text-2xl shadow-lg`}>
                      {getCategoryIcon(contribution.category)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900">{contribution.title}</h2>
                      <p className="text-neutral-600 text-sm mt-1">{contribution.category}</p>
                    </div>
                  </div>
                </div>

                {/* Faculty Info */}
                <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                  <div>
                    <p className="text-sm text-neutral-500 uppercase tracking-wide">Faculty Name</p>
                    <p className="text-lg font-semibold text-neutral-900">{contribution.faculty?.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 uppercase tracking-wide">Email</p>
                    <p className="text-neutral-900">{contribution.faculty?.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-neutral-500 uppercase tracking-wide">Category</p>
                      <p className="text-neutral-900 font-semibold">{contribution.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 uppercase tracking-wide">Academic Year</p>
                      <p className="text-neutral-900 font-semibold">{contribution.academicYear}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">Description</p>
                  <p className="text-neutral-700 leading-relaxed">
                    {contribution.description || 'No description provided'}
                  </p>
                </div>

                {/* Proof Files */}
                <div>
                  <p className="text-sm text-neutral-500 uppercase tracking-wide mb-3">Proof Documents</p>
                  {!contribution.proofFiles || contribution.proofFiles.length === 0 ? (
                    <div className="text-center py-6 bg-neutral-50 rounded-lg border border-dashed border-neutral-300">
                      <p className="text-neutral-600">No documentation files uploaded</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {contribution.proofFiles.map((file, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleDownload(index, file.fileName)}
                          className="w-full p-3 text-left bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 16.5a1 1 0 11-2 0 1 1 0 012 0zM15 7a2 2 0 11-4 0 2 2 0 014 0zM12.5 1a1.5 1.5 0 00-3 0v1.6a4 4 0 00.8 2.4L8 7.5a1 1 0 000 1.414l2.3 2.3a4 4 0 002.4.8h1.6a1.5 1.5 0 000-3h-1.6a2 2 0 01-1.414-.586L10 9.414 7.707 7.12a4 4 0 01.8-2.4V1z" />
                            </svg>
                            <span className="font-medium text-neutral-900">{file.fileName}</span>
                          </div>
                          <svg className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Evaluation Form */}
            <div>
              <form onSubmit={handleSubmit} className="card sticky top-20">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Submit Evaluation</h3>

                <div className="form-group mb-6">
                  <label className="block mb-2 font-semibold text-neutral-700">Score (0-100)*</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter score"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white"
                    />
                    {score && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="text-2xl font-bold text-primary-600">{score}%</div>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                    <div className="flex-1 h-1 bg-danger-500 rounded"></div>
                    <div className="flex-1 h-1 bg-warning-500 rounded"></div>
                    <div className="flex-1 h-1 bg-success-500 rounded"></div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="block mb-2 font-semibold text-neutral-700">Remarks/Feedback</label>
                  <textarea
                    placeholder="Provide constructive feedback..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white h-40"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-6 border-t border-neutral-200">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 btn btn-primary relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className={submitting ? 'opacity-0' : 'opacity-100 transition-opacity'}>
                      Submit
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
                    onClick={() => navigate('/evaluator/pending')}
                    className="flex-1 btn btn-outline border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EvaluateContribution;
