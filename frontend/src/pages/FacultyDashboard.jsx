import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useTypewriter } from '../hooks/useTypewriter';
import FacultyProfile from './FacultyProfile';
import FacultyContributions from './FacultyContributions';
import FacultyProfileView from './FacultyProfileView';

const FacultyDashboard = () => {
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);
  const [selectedStatCard, setSelectedStatCard] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const typewriterText = useTypewriter(
    'Manage your profile, contributions, and track your evaluation progress.',
    40,
    25,
    2500
  );

  const menuItems = [
    {
      icon: '📝',
      title: 'Edit My Profile',
      description: 'Update your personal and professional information',
      section: 'profile',
      width: 'flex-1',
    },
    {
      icon: '📌',
      title: 'My Contributions',
      description: 'View and manage your academic contributions',
      section: 'contributions',
      width: 'flex-1',
    },
    {
      icon: '👁️',
      title: 'View My Profile',
      description: 'See your complete profile as others view it',
      section: 'profile-view',
      width: 'flex-1',
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, Faculty! 👨‍🎓
              </h1>
              <p className="text-gray-700 text-lg max-w-4xl min-h-12 flex items-start">
                {typewriterText}
                <span className="ml-1 animate-pulse">|</span>
              </p>
            </div>

            {/* Menu Cards - Side by Side */}
            <div className="flex gap-6 items-stretch animate-fade-in mb-12">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuCardClick(index, item.section)}
                  className={`group card p-8 min-h-56 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left overflow-hidden relative bg-gradient-to-br from-green-300 via-green-400 to-green-500 flex flex-col rounded-2xl ${item.width} ${
                    selectedMenuCard === index 
                      ? 'border-2 border-black' 
                      : 'border-2 border-lime-300 hover:border-black'
                  }`}
                >
                  {/* Icon */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-green-50 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Action indicator */}
                    <div className="flex items-center gap-2 text-lime-200 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Manage
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-lime-300 rounded-2xl transition-all duration-300 opacity-50 group-hover:opacity-100"></div>
                </button>
              ))}
            </div>

            {/* Quick Stats Section */}
            <div className="flex gap-6 items-stretch animate-slide-in-up">
              {[
                { label: 'My Contributions', value: '---', icon: '📌' },
                { label: 'Evaluation Status', value: 'Pending', icon: '⭐' },
                { label: 'Year Report', value: 'Available', icon: '📊' },
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedStatCard(selectedStatCard === idx ? null : idx)}
                  className={`card flex-1 p-8 min-h-56 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-300 to-green-400 rounded-2xl flex flex-col justify-center items-center cursor-pointer ${
                    selectedStatCard === idx 
                      ? 'border-2 border-black' 
                      : 'border-2 border-lime-300 hover:border-black'
                  }`}
                >
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <p className="text-white text-sm mb-2 font-semibold">{stat.label}</p>
                  <p className="text-3xl font-bold text-lime-100">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Header with back button */}
            <div className="mb-8 flex items-center gap-4 animate-slide-in-down">
              <button
                onClick={() => setSelectedSection(null)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 flex items-center gap-2 font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
            </div>

            {/* Content Sections */}
            {selectedSection === 'profile' && (
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <FacultyProfile />
              </div>
            )}
            {selectedSection === 'contributions' && (
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <FacultyContributions />
              </div>
            )}
            {selectedSection === 'profile-view' && (
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <FacultyProfileView />
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default FacultyDashboard;
