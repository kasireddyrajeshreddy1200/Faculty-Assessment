import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const PendingContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPending = async () => {
      setLoading(true);
      try {
        const res = await api.get('/evaluations/pending');
        setContributions(res.data || []);
      } catch (err) {
        console.error('Error fetching pending contributions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-in-down">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">⏳</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-100">Pending Contributions</h2>
              <p className="text-slate-400 mt-1">Evaluate faculty contributions awaiting review</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner"></div>
          </div>
        ) : contributions.length === 0 ? (
          <div className="card text-center py-16 animate-fade-in border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">All Caught Up!</h3>
            <p className="text-slate-400 mb-6">No pending contributions to evaluate at the moment.</p>
          </div>
        ) : (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
              <div className="card text-center p-4">
                <p className="text-sm text-neutral-600 mb-1">Total Pending</p>
                <p className="text-3xl font-bold text-warning-600">{contributions.length}</p>
              </div>
              <div className="card text-center p-4">
                <p className="text-sm text-neutral-600 mb-1">Awaiting Evaluation</p>
                <p className="text-3xl font-bold text-primary-600">{contributions.filter(c => !c.evaluated).length}</p>
              </div>
              <div className="card text-center p-4">
                <p className="text-sm text-neutral-600 mb-1">Completion Rate</p>
                <p className="text-3xl font-bold text-success-600">
                  {contributions.length > 0 ? Math.round(((contributions.filter(c => c.evaluated).length) / contributions.length) * 100) : 0}%
                </p>
              </div>
            </div>

            {/* Contributions List */}
            <div className="space-y-4 animate-slide-in-up">
              {contributions.map((contribution, index) => (
                <div 
                  key={contribution._id} 
                  className="card group hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Left: Faculty & Title */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${getCategoryColor(contribution.category)} rounded-lg flex items-center justify-center text-lg flex-shrink-0 shadow-md`}>
                          {getCategoryIcon(contribution.category)}
                        </div>
                        <div>
                          <h3 className="font-bold text-neutral-900 text-lg group-hover:text-primary-600 transition-colors">
                            {contribution.title}
                          </h3>
                          <p className="text-sm text-neutral-600 mt-1">
                            <span className="font-semibold">Faculty:</span> {contribution.faculty ? contribution.faculty.name : 'Unknown'}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-neutral-500">Category</p>
                          <p className="font-semibold text-neutral-900">{contribution.category}</p>
                        </div>
                        <div>
                          <p className="text-neutral-500">Year</p>
                          <p className="font-semibold text-neutral-900">{contribution.academicYear}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Action Button */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() =>
                          navigate(`/evaluator/evaluate/${contribution._id}`, {
                            state: { contribution }
                          })
                        }
                        className="btn btn-primary w-full md:w-auto flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        Evaluate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PendingContributions;
