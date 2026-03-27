import { useEffect, useState } from 'react';
import { getMyContributions, deleteContribution } from '../api/contribution.api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ContributionCard from '../components/ContributionCard';

const FacultyContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getMyContributions();
      setContributions(res.data || []);
    } catch (err) {
      console.error('Error loading contributions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contribution?')) {
      try {
        await deleteContribution(id);
        loadData();
      } catch (err) {
        console.error('Error deleting contribution:', err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/faculty/contributions/edit/${id}`);
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-in-down">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">📌</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-100">My Contributions</h1>
                  <p className="text-slate-400 mt-1">View and manage your academic contributions</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/faculty/contributions/add')}
                className="btn btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Contribution
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner"></div>
            </div>
          ) : contributions.length === 0 ? (
            <div className="card text-center py-16 animate-fade-in border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl">
              <div className="text-6xl mb-4">📭</div>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">No Contributions Yet</h2>
              <p className="text-slate-400 mb-6">
                Start by adding your first contribution to showcase your achievements.
              </p>
            </div>
          ) : (
            <>
              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in">
                <div className="card text-center p-4 border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Total Contributions</p>
                  <p className="text-3xl font-bold text-purple-300">{contributions.length}</p>
                </div>
                <div className="card text-center p-4">
                  <p className="text-sm text-neutral-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-warning-600">{contributions.filter(c => c.status === 'PENDING').length}</p>
                </div>
                <div className="card text-center p-4">
                  <p className="text-sm text-neutral-600 mb-1">Approved</p>
                  <p className="text-3xl font-bold text-success-600">{contributions.filter(c => c.status === 'APPROVED').length}</p>
                </div>
                <div className="card text-center p-4">
                  <p className="text-sm text-neutral-600 mb-1">Evaluated</p>
                  <p className="text-3xl font-bold text-primary-600">{contributions.filter(c => c.status === 'EVALUATED').length}</p>
                </div>
              </div>

              {/* Contributions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-in-up">
                {contributions.map((contribution) => (
                  <ContributionCard
                    key={contribution._id}
                    contribution={contribution}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default FacultyContributions;
