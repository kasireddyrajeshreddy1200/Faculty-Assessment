import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../api/auth.api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
      setResetToken(data.resetToken);
      
      // Clear form after 5 seconds and show the token
      setTimeout(() => {
        // User will see the token and can proceed to reset password
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process forgot password request');
    } finally {
      setLoading(false);
    }
  };

  const handleResetClick = () => {
    if (resetToken) {
      navigate(`/reset-password/${resetToken}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 animate-fade-in">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-accent opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-in-down">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">🔐</span>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Reset Password
          </h1>
          <p className="text-neutral-600 text-base">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Form */}
        <div className="card animate-slide-in-up backdrop-blur-xl">
          {error && (
            <div className="alert alert-danger mb-4 rounded-lg">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {message && !resetToken && (
            <div className="alert alert-info mb-4 rounded-lg">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" clipRule="evenodd" />
              </svg>
              <span>{message}</span>
            </div>
          )}

          {/* Show Token Section */}
          {resetToken && (
            <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
              <p className="text-sm font-semibold text-amber-900 mb-3">✓ Reset Token Generated</p>
              <div className="mb-4">
                <p className="text-xs text-amber-700 mb-2">Copy this token:</p>
                <div className="p-3 bg-white border border-amber-200 rounded font-mono text-xs text-neutral-700 break-all">
                  {resetToken}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(resetToken);
                  setMessage('Token copied to clipboard!');
                }}
                className="w-full text-xs btn btn-secondary mb-3"
              >
                Copy Token
              </button>
              <button
                type="button"
                onClick={handleResetClick}
                className="w-full btn btn-primary"
              >
                Proceed to Reset Password
              </button>
            </div>
          )}

          {!resetToken && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="block mb-2 font-semibold text-neutral-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 bg-white text-neutral-900 placeholder-neutral-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary mt-6 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className={loading ? 'opacity-0' : 'opacity-100 transition-opacity'}>
                  Send Reset Token
                </span>
                {loading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                )}
              </button>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-neutral-600">
          <p>© 2024 Faculty Assessment System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
