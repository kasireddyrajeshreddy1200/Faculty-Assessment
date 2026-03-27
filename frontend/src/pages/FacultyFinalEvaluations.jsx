import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getMyFinalEvaluations } from '../api/faculty.api';
import { useNavigate } from 'react-router-dom';

const FacultyFinalEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getMyFinalEvaluations();
      setEvaluations(data || []);
    } catch (error) {
      console.error(error);
      setEvaluations([]);
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
                <span className="text-white font-bold text-xl">⭐</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-100">My Final Evaluations</h1>
                <p className="text-slate-400 mt-1">Review your final evaluation results from evaluators</p>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="card border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl animate-fade-in p-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="spinner"></div>
              </div>
            ) : evaluations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-slate-400">No final evaluations yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-purple-500/30">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Academic Year</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Total Score</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Remarks</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Evaluated By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluations.map((e) => (
                      <tr key={e._id} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors">
                        <td className="py-3 px-4 text-slate-100">{e.academicYear}</td>
                        <td className="py-3 px-4 text-right text-purple-300 font-semibold">{e.totalScore}</td>
                        <td className="py-3 px-4 text-slate-300">{e.remarks || '-'}</td>
                        <td className="py-3 px-4 text-slate-300">{e.evaluator?.name || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={() => navigate('/faculty')}
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

export default FacultyFinalEvaluations;
