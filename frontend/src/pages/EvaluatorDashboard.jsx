import { useState } from 'react';
import Navbar from '../components/Navbar';
import EvaluatorProfile from './EvaluatorProfile';
import EvaluatorProfileView from './EvaluatorProfileView';
import PendingContributions from './PendingContributions';
import FinalEvaluation from './FinalEvaluation';
import EvaluatorFacultyReport from './EvaluatorFacultyReport';

const EvaluatorDashboard = () => {
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const menuItems = [
    {
      icon: '📝',
      title: 'Edit My Profile',
      description: 'Update your evaluator profile information',
      section: 'profile-edit',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: '👁️',
      title: 'View My Profile',
      description: 'See how your profile appears to others',
      section: 'profile-view',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: '⏳',
      title: 'Pending Evaluations',
      description: 'Review contributions awaiting your evaluation',
      section: 'pending',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: '⭐',
      title: 'Final Evaluation',
      description: 'Create and submit final evaluation scores',
      section: 'final',
      color: 'from-rose-500 to-rose-600',
    },
    {
      icon: '📊',
      title: 'Faculty Report',
      description: 'Generate comprehensive faculty evaluation report',
      section: 'faculty-report',
      color: 'from-violet-500 to-violet-600',
    },
  ];

  const handleMenuCardClick = (index, section) => {
    setSelectedMenuCard(index);
    setSelectedSection(section);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
        {!selectedSection ? (
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="mb-12 animate-slide-in-down">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">📋</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-100">
                    Evaluator Dashboard
                  </h1>
                  <p className="text-slate-400 mt-1">Manage evaluations and faculty reports</p>
                </div>
              </div>
              <p className="text-slate-300 text-lg max-w-2xl">
                Review pending contributions, conduct evaluations, and generate comprehensive performance reports.
              </p>
            </div>

            {/* Menu Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuCardClick(index, item.section)}
                  className="group card p-8 min-h-56 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left overflow-hidden relative border-2 border-blue-500/40 hover:border-blue-500/60 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 flex flex-col rounded-2xl no-underline cursor-pointer"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                  {/* Icon */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-blue-50 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Action indicator */}
                    <div className="flex items-center gap-2 text-sky-200 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Access
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Border animation */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500 rounded-2xl transition-all duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Header with back button */}
            <div className="mb-8 flex items-center gap-4 animate-slide-in-down">
              <button
                onClick={() => setSelectedSection(null)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 flex items-center gap-2 font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
            </div>

            {/* Content Sections */}
            {selectedSection === 'profile-edit' && (
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <EvaluatorProfile />
              </div>
            )}
            {selectedSection === 'profile-view' && (
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <EvaluatorProfileView />
              </div>
            )}
            {selectedSection === 'pending' && (
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <PendingContributions />
              </div>
            )}
            {selectedSection === 'final' && (
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <FinalEvaluation />
              </div>
            )}
            {selectedSection === 'faculty-report' && (
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <EvaluatorFacultyReport />
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
};;

export default EvaluatorDashboard;
