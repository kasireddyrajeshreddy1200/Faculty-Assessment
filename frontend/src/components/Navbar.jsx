import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-primary shadow-lg sticky top-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate(-1)}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center group-hover:bg-cyan-200 transition-all duration-300 shadow-lg flex-shrink-0">
                <span className="text-blue-900 font-bold text-xl">FA</span>
              </div>
              <h1 className="text-white font-bold text-lg hidden sm:block leading-none mb-0">
                Faculty Assessment
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="group relative w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 text-white font-semibold rounded-full hover:from-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex items-center justify-center border-2 border-red-300/50 hover:border-red-200"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              {/* Icon */}
              <svg className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              
              {/* Tooltip on hover */}
              <span className="absolute bottom-full mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
