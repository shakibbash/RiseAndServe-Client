import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import { useAuth } from '../Provider/AuthProvider';

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn, githubSignIn } = useAuth();
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
      const userCredential = await createUser(email, password);
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

      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1D3557]">Create Your Account</h2>
            <p className="mt-2 text-gray-600">Join the RiseAndServe community</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35]"
              />
            </div>

            <div>
              <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                Photo URL
              </label>
              <input
                id="photoURL"
                name="photoURL"
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Profile picture URL"
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                className={`mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none ${
                  passwordError
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-[#FF6B35] focus:border-[#FF6B35]'
                }`}
              />
              {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
              <p className="mt-1 text-xs text-gray-500">
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

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

             <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleRegister}
                disabled={loading}
                className="cursor-pointer flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-[#F0F0F0] transition"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>

              <button
                onClick={handleGithubRegister}
                disabled={loading}
                className="cursor-pointer flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-[#F0F0F0] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="h-5 w-5 mr-2">
                  <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#FF6B35] hover:text-[#2A9D8F] transition-colors">
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
