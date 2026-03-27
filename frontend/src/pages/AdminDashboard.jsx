import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { useTypewriter } from '../hooks/useTypewriter';
import { registerUser } from '../api/user.api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSystemReportModal, setShowSystemReportModal] = useState(false);
  const [showCategoryReportModal, setShowCategoryReportModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'FACULTY'
  });
  
  // System Report State
  const [systemReportData, setSystemReportData] = useState([]);
  const [systemReportLoading, setSystemReportLoading] = useState(false);
  
  // Category Report State
  const [categoryYear, setCategoryYear] = useState('');
  const [categoryReportData, setCategoryReportData] = useState([]);
  const [categoryReportLoading, setCategoryReportLoading] = useState(false);
  const [categoryMessage, setCategoryMessage] = useState({ type: '', text: '' });
  
  // Card Selection State
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);
  const [selectedStatCard, setSelectedStatCard] = useState(null);

  const typewriterText = useTypewriter(
    'Manage faculty members, evaluators, and access comprehensive system reports and analytics.',
    40,
    25,
    2500
  );

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMenuCardClick = (index, action) => {
    setSelectedMenuCard(index);
    action();
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await registerUser(formData);
      setMessage({ type: 'success', text: 'User created successfully! ✓' });
      setFormData({ name: '', email: '', password: '', role: 'FACULTY' });
      setTimeout(() => {
        setShowRegisterModal(false);
        setMessage({ type: '', text: '' });
      }, 2000);
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Error occurred' });
    } finally {
      setLoading(false);
    }
  };

  // System Report Handlers
  const handleOpenSystemReport = async () => {
    setShowSystemReportModal(true);
    setSystemReportLoading(true);
    try {
      const res = await api.get('/reports/system');
      setSystemReportData(res.data);
    } catch (error) {
      console.error('Error fetching system report:', error);
    } finally {
      setSystemReportLoading(false);
    }
  };

  // Category Report Handlers
  const handleFetchCategoryReport = async () => {
    if (!categoryYear) {
      setCategoryMessage({ type: 'danger', text: 'Please enter an academic year' });
      return;
    }
    
    setCategoryReportLoading(true);
    setCategoryMessage({ type: '', text: '' });
    try {
      const res = await api.get(`/reports/category/${categoryYear}`);
      setCategoryReportData(res.data);
      setCategoryMessage({ type: 'success', text: 'Report loaded successfully' });
    } catch (error) {
      setCategoryMessage({ type: 'danger', text: error.response?.data?.message || 'Failed to fetch report' });
      setCategoryReportData([]);
    } finally {
      setCategoryReportLoading(false);
    }
  };

  const menuItems = [
    {
      icon: '👥',
      title: 'Register Users',
      description: 'Add new faculty members and evaluators to the system',
      action: () => setShowRegisterModal(true),
      width: 'flex-1',
    },
    {
      icon: '📊',
      title: 'System Report',
      description: 'View comprehensive system-wide evaluation reports',
      action: () => handleOpenSystemReport(),
      width: 'flex-1',
    },
    {
      icon: '📋',
      title: 'Category Summary',
      description: 'Analyze contribution categories and summaries',
      action: () => setShowCategoryReportModal(true),
      width: 'flex-1',
    },
  ];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 animate-slide-in-down">
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, Admin! 👋</p>
            </div>
            <p className="text-gray-700 text-lg max-w-4xl min-h-12 flex items-start">
              {typewriterText}
              <span className="ml-1 animate-pulse">|</span>
            </p>
          </div>

          {/* Menu Cards - Side by Side with Decreasing Width */}
          <div className="flex gap-6 items-stretch animate-fade-in mb-12">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuCardClick(index, item.action)}
                className={`group card p-8 min-h-56 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left overflow-hidden relative bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 flex flex-col rounded-2xl ${item.width} ${
                  selectedMenuCard === index 
                    ? 'border-2 border-black' 
                    : 'border-2 border-yellow-500 hover:border-black'
                }`}
              >
                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-orange-50 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Action indicator */}
                  <div className="flex items-center gap-2 text-yellow-200 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Manage
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Border glow on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-300 rounded-2xl transition-all duration-300 opacity-50 group-hover:opacity-100"></div>
              </button>
            ))}
          </div>

          {/* Quick Stats Section */}
          <div className="flex gap-6 items-stretch animate-slide-in-up">
            {[
              { label: 'Total Users', value: '---', icon: '👥' },
              { label: 'Active Evaluations', value: '---', icon: '📊' },
              { label: 'System Status', value: 'Operational', icon: '✅' },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedStatCard(selectedStatCard === idx ? null : idx)}
                className={`card flex-1 p-8 min-h-56 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-orange-300 to-orange-400 rounded-2xl flex flex-col justify-center items-center cursor-pointer ${
                  selectedStatCard === idx 
                    ? 'border-2 border-black' 
                    : 'border-2 border-yellow-500 hover:border-black'
                }`}
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <p className="text-white text-sm mb-2 font-semibold">{stat.label}</p>
                <p className="text-3xl font-bold text-yellow-100">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slide-in-up">
            {/* Modal Header */}
            <div className="bg-gradient-to-br from-orange-300 to-orange-400 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Add User
                </h2>
                <button
                  onClick={() => setShowRegisterModal(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Message Alert */}
              {message.text && (
                <div className={`p-3 rounded-lg mb-4 flex items-start gap-2 text-sm ${
                  message.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {message.type === 'success' ? (
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="font-semibold">{message.text}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-gray-900 placeholder-gray-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-gray-900 placeholder-gray-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-gray-900 placeholder-gray-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-gray-900 text-sm"
                  >
                    <option value="FACULTY">Faculty Member</option>
                    <option value="EVALUATOR">Evaluator</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-gradient-to-br from-orange-300 to-orange-400 text-white font-semibold rounded-lg hover:from-orange-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Create
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300 text-sm"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* System Report Modal */}
      {showSystemReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto animate-slide-in-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-br from-orange-300 to-orange-400 p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                System Report
              </h2>
              <button
                onClick={() => setShowSystemReportModal(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {systemReportLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <svg className="animate-spin h-12 w-12 text-orange-400 mx-auto" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-gray-600 font-semibold">Loading report...</p>
                  </div>
                </div>
              ) : systemReportData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Academic Year</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Total Contributions</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Total Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemReportData.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-orange-50 transition-colors">
                          <td className="px-4 py-3 text-gray-900 font-medium">{item._id}</td>
                          <td className="px-4 py-3 text-gray-700">{item.totalContributions}</td>
                          <td className="px-4 py-3 text-orange-600 font-semibold">{item.totalScore.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-600 font-semibold">No data available</p>
                </div>
              )}

              {/* Close Button */}
              <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSystemReportModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Report Modal */}
      {showCategoryReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto animate-slide-in-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-br from-orange-300 to-orange-400 p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Category Summary
              </h2>
              <button
                onClick={() => setShowCategoryReportModal(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Year Input Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Academic Year</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter year (e.g., 2024-25)"
                    value={categoryYear}
                    onChange={(e) => setCategoryYear(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-gray-900 placeholder-gray-400"
                  />
                  <button
                    onClick={handleFetchCategoryReport}
                    disabled={categoryReportLoading}
                    className="px-6 py-2 bg-gradient-to-br from-orange-300 to-orange-400 text-white font-semibold rounded-lg hover:from-orange-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                  >
                    {categoryReportLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Get Summary
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Message Alert */}
              {categoryMessage.text && (
                <div className={`p-3 rounded-lg mb-4 flex items-start gap-2 text-sm ${
                  categoryMessage.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {categoryMessage.type === 'success' ? (
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="font-semibold">{categoryMessage.text}</span>
                </div>
              )}

              {/* Table or Empty State */}
              {categoryReportData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Category</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Total Contributions</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Total Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryReportData.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-orange-50 transition-colors">
                          <td className="px-4 py-3 text-gray-900 font-medium">{item._id}</td>
                          <td className="px-4 py-3 text-gray-700">{item.count}</td>
                          <td className="px-4 py-3 text-orange-600 font-semibold">{item.totalScore.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-600 font-semibold">Enter a year and click "Get Summary" to load data</p>
                </div>
              )}

              {/* Close Button */}
              <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCategoryReportModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
