import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';


const EvaluatorFacultyReport = () => {
  const navigate = useNavigate();

  const [facultyList, setFacultyList] = useState([]);
  const [facultyId, setFacultyId] = useState('');
  const [year, setYear] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await api.get('/auth/faculty-list');
      setFacultyList(res.data);
    } catch (error) {
      console.error('Error fetching faculty list:', error);
    }
  };

  const fetchReport = async () => {
    if (!facultyId || !year) {
      setMessage({ type: 'danger', text: 'Please select faculty and academic year' });
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(`/reports/faculty-report/${facultyId}/${year}`);
      setReport(res.data);
      setMessage({ type: 'success', text: 'Report loaded successfully' });
    } catch (error) {
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Failed to fetch report' });
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const getFacultyName = () => {
    const faculty = facultyList.find(f => f._id === facultyId);
    return faculty ? faculty.name : '';
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-in-down">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">📋</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-100">Faculty Year Report</h1>
                <p className="text-slate-400 mt-1">Review faculty contributions and evaluation scores</p>
              </div>
            </div>
          </div>

          {/* Filter Card */}
          <div className="card p-6 mb-8 border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {/* Faculty Dropdown */}
              <select
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                className="px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-slate-700 text-slate-100"
              >
                <option value="">Select Faculty</option>
                {facultyList.map((f) => (
                  <option key={f._id} value={f._id}>
                    {f.name} ({f.email})
                  </option>
                ))}
              </select>

              {/* Academic Year Input */}
              <input
                type="text"
                placeholder="Academic Year (e.g., 2025-2026)"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchReport()}
                className="px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-slate-700 text-slate-100 placeholder-slate-500"
              />

              {/* Get Report Button */}
              <button
                onClick={fetchReport}
                disabled={loading}
                className="btn btn-primary disabled:opacity-70"
              >
                {loading ? 'Loading...' : 'Get Report'}
              </button>
            </div>
            {message.text && (
              <div className={`alert alert-${message.type} rounded-lg`}>
                {message.text}
              </div>
            )}
          </div>

          {/* Report Card */}
          {report && (
            <div className="card p-8 border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl animate-fade-in">
              {/* Faculty Header */}
              <div className="mb-6 pb-6 borderb-2 border-purple-500/30">
                <h2 className="text-2xl font-bold text-slate-100 mb-2">{getFacultyName()}</h2>
                <p className="text-slate-400">Academic Year: <span className="text-purple-300 font-semibold">{year}</span></p>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-purple-900/30 to-violet-900/30 rounded-xl border border-purple-500/20">
                  <p className="text-slate-400 text-sm mb-1">Total Score</p>
                  <p className="text-3xl font-bold text-purple-300">{report.totalScore || 0}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-900/30 to-violet-900/30 rounded-xl border border-purple-500/20">
                  <p className="text-slate-400 text-sm mb-1">Contributions</p>
                  <p className="text-3xl font-bold text-purple-300">{report.contributionCount || 0}</p>
                </div>
              </div>

              {/* Contributions Table */}
              {report.contributions && report.contributions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-purple-500/30">
                        <th className="text-left py-3 px-4 text-slate-300 font-semibold">Title</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-semibold">Category</th>
                        <th className="text-right py-3 px-4 text-slate-300 font-semibold">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.contributions.map((c) => (
                        <tr key={c._id} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors">
                          <td className="py-3 px-4 text-slate-100">{c.title}</td>
                          <td className="py-3 px-4">
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                              {c.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right text-purple-300 font-semibold">{c.score || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-400 text-center py-8">No contributions found for this faculty in the given academic year.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default EvaluatorFacultyReport;
