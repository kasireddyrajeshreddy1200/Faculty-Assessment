import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user.api';
import Navbar from '../components/Navbar';

const RegisterUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'FACULTY'
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      setMessage({ type: 'success', text: 'User created successfully! ✓' });
      setForm({ name: '', email: '', password: '', role: 'FACULTY' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white p-4 md:p-8">
        <div className="max-w-2xl mx-auto animate-slide-in-up">
          {/* Header */}
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Create New User
            </h1>
            <p className="text-gray-600 text-lg">
              Register a new faculty member or evaluator to the system
            </p>
          </div>

          {/* Main Card */}
          <div className="card border-2 border-yellow-500 bg-gradient-to-br from-orange-300 to-orange-400 rounded-2xl p-8 md:p-10 shadow-lg animate-fade-in">
            {/* Message Alert */}
            {message.text && (
              <div className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${
                message.type === 'success' 
                  ? 'bg-green-100 border-2 border-green-400 text-green-800' 
                  : 'bg-red-100 border-2 border-red-400 text-red-800'
              }`}>
                {message.type === 'success' ? (
                  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-semibold">{message.text}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div className="form-group">
                <label className="block mb-2 font-semibold text-white text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border-2 border-white rounded-lg focus:border-yellow-200 focus:ring-4 focus:ring-white/30 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                />
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label className="block mb-2 font-semibold text-white text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border-2 border-white rounded-lg focus:border-yellow-200 focus:ring-4 focus:ring-white/30 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                />
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label className="block mb-2 font-semibold text-white text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter secure password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border-2 border-white rounded-lg focus:border-yellow-200 focus:ring-4 focus:ring-white/30 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                />
                <p className="mt-2 text-white text-sm">Minimum 6 characters recommended</p>
              </div>

              {/* User Role Field */}
              <div className="form-group">
                <label className="block mb-2 font-semibold text-white text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  User Role
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border-2 border-white rounded-lg focus:border-yellow-200 focus:ring-4 focus:ring-white/30 transition-all duration-300 bg-white text-gray-900 font-medium appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="FACULTY">👨‍🏫 Faculty Member</option>
                  <option value="EVALUATOR">📋 Evaluator</option>
                </select>
              </div>

              {/* Buttons Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 border-2 border-white"
                >
                  {!loading ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Create User
                    </>
                  ) : (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  )}
                </button>

                {/* Back Button */}
                <button
                  onClick={() => navigate('/admin')}
                  type="button"
                  className="group relative px-6 py-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 border-2 border-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default RegisterUser;
