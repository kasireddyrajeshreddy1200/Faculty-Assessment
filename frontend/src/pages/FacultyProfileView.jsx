import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getFacultyProfile } from '../api/faculty.api';

const FacultyProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await getFacultyProfile();
      setProfile(data);
    } catch (error) {
      alert('No profile found. Please create your profile first.');
      navigate('/faculty/profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  if (!profile) return null;

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-in-down">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">👤</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-100">My Profile</h1>
                <p className="text-slate-400 mt-1">View your professional information</p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="card border-2 border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 animate-fade-in">
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="pb-6 border-b border-purple-500/30">
                <h2 className="text-2xl font-bold text-slate-100 mb-2">{profile.user.name}</h2>
                <p className="text-slate-400">{profile.user.email}</p>
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Department</p>
                  <p className="text-lg font-semibold text-slate-100">{profile.department || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Designation</p>
                  <p className="text-lg font-semibold text-slate-100">{profile.designation || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Joining Date</p>
                  <p className="text-lg font-semibold text-slate-100">{profile.joiningDate ? profile.joiningDate.slice(0, 10) : '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Qualifications</p>
                  <p className="text-lg font-semibold text-slate-100">{profile.qualifications || '-'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3 flex-col sm:flex-row">
            <button
              onClick={() => navigate('/faculty/profile')}
              className="btn btn-primary flex-1"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate('/faculty')}
              className="btn btn-outline text-slate-100 border-slate-600 hover:bg-slate-700 flex-1"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default FacultyProfileView;
