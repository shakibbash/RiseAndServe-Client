import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useAuth } from '../Provider/AuthProvider';
import { eventAPI } from '../Api/apiClient'; // example usage of API

const Login = () => {
  const { login, googleSignIn, githubSignIn, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (err) {
      let errorMessage = 'Login failed. Please check your credentials.';
      if (err.code === 'auth/user-not-found') errorMessage = 'No user found. Please register first.';
      else if (err.code === 'auth/wrong-password') errorMessage = 'Wrong password. Please try again.';
      else if (err.code === 'auth/too-many-requests') errorMessage = 'Too many attempts. Try later.';

      setError(errorMessage);
      Swal.fire({ icon: 'error', title: 'Login Failed', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleSignIn();

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError('Google login failed. Please try again.');
      Swal.fire({ icon: 'error', title: 'Login Failed', text: 'Google login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // GitHub login
  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      await githubSignIn();

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError('GitHub login failed. Please try again.');
      Swal.fire({ icon: 'error', title: 'Login Failed', text: 'GitHub login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already logged in
  if (user) {
    navigate('/');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Login - RiseAndServe</title>
      </Helmet>

      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1D3557]">Sign in to your account</h2>
            <p className="mt-2 text-gray-600">Welcome back to RiseAndServe</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35]"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-sm text-[#FF6B35] hover:text-[#2A9D8F]">Forgot password?</button>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35]"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF6B35] hover:bg-[#2A9D8F] text-white py-2 px-4 rounded-md font-medium transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={handleGoogleLogin} disabled={loading} className="cursor-pointer flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-[#F0F0F0] transition">Google</button>
              <button onClick={handleGithubLogin} disabled={loading} className="cursor-pointer flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-[#F0F0F0] transition">GitHub</button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="cursor-pointer font-medium text-[#FF6B35] hover:text-[#2A9D8F] transition-colors">Sign up now</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
