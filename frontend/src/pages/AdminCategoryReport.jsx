import { useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AdminCategoryReport = () => {
  const [year, setYear] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const fetchReport = async () => {
    if (!year) {
      setMessage({ type: 'danger', text: 'Please enter an academic year' });
      return;
    }
    
    setLoading(true);
    try {
      const res = await api.get(`/reports/category/${year}`);
      setData(res.data);
      setMessage({ type: 'success', text: 'Report loaded successfully' });
    } catch (error) {
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Failed to fetch report' });
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-in-down">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">📊</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-100">Category Summary</h1>
                <p className="text-slate-400 mt-1">Analyze contribution categories by academic year</p>
              </div>
            </div>
          </div>

          {/* Filter Card */}
          <div className="card p-6 mb-8 border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl animate-fade-in">
            <div className="flex gap-3 flex-col sm:flex-row">
              <input
                type="text"
                placeholder="Academic Year (e.g., 2024-25)"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchReport()}
                className="flex-1 px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all bg-slate-700 text-slate-100 placeholder-slate-500"
              />
              <button
                onClick={fetchReport}
                disabled={loading}
                className="btn btn-primary px-6 whitespace-nowrap disabled:opacity-70"
              >
                {loading ? 'Loading...' : 'Get Summary'}
              </button>
            </div>
            {message.text && (
              <div className={`alert alert-${message.type} mt-4 rounded-lg`}>
                {message.text}
              </div>
            )}
          </div>

          {/* Report Card */}
          {data.length > 0 && (
            <div className="card p-8 border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-purple-500/30">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Category</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Total Contributions</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Total Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors">
                        <td className="py-3 px-4 text-slate-100">{row._id}</td>
                        <td className="py-3 px-4 text-right text-purple-300 font-semibold">{row.count}</td>
                        <td className="py-3 px-4 text-right text-purple-300 font-semibold">{row.totalScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={() => navigate('/admin')}
              className="btn btn-outline text-slate-100 border-slate-600 hover:bg-slate-700 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminCategoryReport;
