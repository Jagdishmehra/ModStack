import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { FaNoteSticky } from 'react-icons/fa6';

const Home = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/notes');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="max-w-5xl mx-auto mt-10 md:mt-20">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            Capture Your Ideas <br className="hidden sm:block" />
            <span className="text-blue-600">Anytime, Anywhere</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A secure and intuitive note-taking app that helps you stay organized and boost productivity.
          </p>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 text-lg"
            >
              Get Started Now
              <FiArrowRight className="ml-2" />
            </Link>
          )}
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl transform rotate-3"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <FaNoteSticky className="text-blue-500 h-8 w-8" />
                <h3 className="ml-2 text-xl font-semibold">Project Ideas</h3>
              </div>
              <p className="text-gray-600 mb-3">Create a responsive dashboard for the analytics project...</p>
              <div className="text-sm text-gray-400">Aug 12, 2023</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Choose NotesApp?</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <FiCheckCircle className="h-6 w-6" />
              </div>
              <h3 className="ml-3 font-semibold text-lg">Easy to Use</h3>
            </div>
            <p className="text-gray-600">Create, update, and delete notes with a clean and intuitive interface.</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <FiCheckCircle className="h-6 w-6" />
              </div>
              <h3 className="ml-3 font-semibold text-lg">Fast Search</h3>
            </div>
            <p className="text-gray-600">Quickly find your notes with our powerful search functionality.</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                <FiCheckCircle className="h-6 w-6" />
              </div>
              <h3 className="ml-3 font-semibold text-lg">Secure</h3>
            </div>
            <p className="text-gray-600">Your notes are protected with state-of-the-art Auth0 authentication.</p>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-lg transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                <FiCheckCircle className="h-6 w-6" />
              </div>
              <h3 className="ml-3 font-semibold text-lg">Responsive</h3>
            </div>
            <p className="text-gray-600">Access your notes from any device with our responsive design.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
