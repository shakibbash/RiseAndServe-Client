import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useAuth } from '../Provider/AuthProvider';
import { useTheme } from '../Provider/ThemeContext';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn, githubSignIn } = useAuth();
  const { isDarkMode } = useTheme(); // dark mode
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) return 'Password must be at least 6 characters long';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    return '';
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(newPassword ? validatePassword(newPassword) : '');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      Swal.fire({ icon: 'error', title: 'Password Error', text: validationError });
      return;
    }

    setLoading(true);
    try {
      await createUser(email, password);
      await updateUserProfile(name, photoURL);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Your account has been created!',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate('/');
    } catch (err) {
      setError(err.message);
      Swal.fire({ icon: 'error', title: 'Registration Failed', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Logged in with Google!',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
      Swal.fire({ icon: 'error', title: 'Registration Failed', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGithubRegister = async () => {
    setLoading(true);
    try {
      await githubSignIn();
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Logged in with GitHub!',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
      Swal.fire({ icon: 'error', title: 'Registration Failed', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - RiseAndServe</title>
      </Helmet>

      <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-[#F9F9F9]'}`}>
        <div className={`max-w-md w-full rounded-xl shadow-lg p-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <div className="text-center">
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#1D3557]'}`}>Create Your Account</h2>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Join the RiseAndServe community</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className={`mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35] ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
              />
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className={`mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35] ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
              />
            </div>

            <div>
              <label htmlFor="photoURL" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Photo URL</label>
              <input
                id="photoURL"
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Profile picture URL"
                className={`mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35] ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                className={`mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none ${
                  passwordError
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : isDarkMode
                    ? 'border-gray-600 focus:ring-[#FF6B35] focus:border-[#FF6B35] bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 focus:ring-[#FF6B35] focus:border-[#FF6B35] bg-white text-gray-900 placeholder-gray-500'
                }`}
              />
              {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
              <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Password must have at least 6 characters, with uppercase & lowercase letters.
              </p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading || !!passwordError}
              className="cursor-pointer w-full bg-[#FF6B35] hover:bg-[#2A9D8F] text-white py-2 px-4 rounded-md font-medium transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Or continue with */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'}`}>Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleRegister}
                disabled={loading}
                className={`cursor-pointer flex justify-center items-center py-2 px-4 border rounded-md transition ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600' : 'border-gray-300 bg-white text-gray-700 hover:bg-[#F0F0F0]'}`}
              >
                <FaGoogle className="mr-2" /> Google
              </button>
              <button
                onClick={handleGithubRegister}
                disabled={loading}
                className={`cursor-pointer flex justify-center items-center py-2 px-4 border rounded-md transition ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600' : 'border-gray-300 bg-white text-gray-700 hover:bg-[#F0F0F0]'}`}
              >
                <FaGithub className="mr-2" /> GitHub
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Already have an account?{' '}
              <Link to="/login" className="cursor-pointer font-medium text-[#FF6B35] hover:text-[#2A9D8F] transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
