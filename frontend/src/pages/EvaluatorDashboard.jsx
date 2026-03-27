import { useState } from 'react';
import Navbar from '../components/Navbar';
import EvaluatorProfile from './EvaluatorProfile';
import EvaluatorProfileView from './EvaluatorProfileView';
import PendingContributions from './PendingContributions';
import FinalEvaluation from './FinalEvaluation';
import EvaluatorFacultyReport from './EvaluatorFacultyReport';
import { useTypewriter } from '../hooks/useTypewriter';

const EvaluatorDashboard = () => {
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const typewriterText = useTypewriter(
    'Review pending contributions, conduct evaluations, and generate comprehensive performance reports.',
    40,
    25,
    2500
  );

  const menuItems = [
    {
      icon: '📝',
      title: 'Edit My Profile',
      description: 'Update your evaluator profile information',
      section: 'profile-edit',
    },
    {
      icon: '👁️',
      title: 'View My Profile',
      description: 'See how your profile appears to others',
      section: 'profile-view',
    },
    {
      icon: '⏳',
      title: 'Pending Evaluations',
      description: 'Review contributions awaiting your evaluation',
      section: 'pending',
    },
    {
      icon: '⭐',
      title: 'Final Evaluation',
      description: 'Create and submit final evaluation scores',
      section: 'final',
    },
    {
      icon: '📊',
      title: 'Faculty Report',
      description: 'Generate comprehensive faculty evaluation report',
      section: 'faculty-report',
    },
  ];

  const handleMenuCardClick = (index, section) => {
    setSelectedMenuCard(index);
    setSelectedSection(section);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white p-4 md:p-8">
        {!selectedSection ? (
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-12 animate-slide-in-down">
              <div className="mb-4">
                <h1 className="text-4xl font-bold text-gray-900">
                  Evaluator Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Manage evaluations and faculty reports</p>
              </div>
              <p className="text-gray-700 text-lg max-w-4xl min-h-12 flex items-start">
                {typewriterText}
                <span className="ml-1 animate-pulse">|</span>
              </p>
            </div>

            {/* Menu Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in mb-12">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuCardClick(index, item.section)}
                  className={`group card p-8 min-h-56 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left overflow-hidden relative bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex flex-col rounded-2xl ${
                    selectedMenuCard === index 
                      ? 'border-2 border-black' 
                      : 'border-2 border-sky-400 hover:border-black'
                  }`}
                >
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

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-sky-300 rounded-2xl transition-all duration-300 opacity-50 group-hover:opacity-100"></div>
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
                className="px-6 py-2 bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
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
};

export default EvaluatorDashboard;
