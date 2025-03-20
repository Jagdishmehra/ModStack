import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiLogOut, FiHome, FiLogIn } from 'react-icons/fi';
import { FaNoteSticky } from 'react-icons/fa6';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth0();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    logout({ 
      logoutParams: { returnTo: window.location.origin }
    });
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-xl font-bold text-blue-600 hover:text-blue-800">
                <FaNoteSticky className="h-6 w-6 mr-2" />
                <span>NotesApp</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center">
                    <FiHome className="mr-1.5" />
                    Home
                  </Link>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                  >
                    <FiLogIn className="mr-1.5" />
                    Log In
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                    onClick={() => setShowLogoutConfirm(true)}
                  >
                    <FiLogOut className="mr-1.5" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showLogoutConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 transform transition-all animate-fadeIn">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Confirm Logout</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
