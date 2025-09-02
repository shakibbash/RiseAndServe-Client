import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import React, { useEffect, useMemo, useState, useContext } from 'react';
import { auth } from '../../Firebase/Firebase.config';
import { AuthContext } from './AuthContext';
import Swal from 'sweetalert2';
import Loader from '../Components/Loader';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Watch auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Create user with email/password
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      // Toast first
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Logout successful',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        background: '#FF6B35',
        color: '#FFFFFF',
        iconColor: '#F77F00',
        customClass: {
          popup: 'rounded-xl shadow-md text-sm font-medium',
        },
      });

      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } finally {
      setLoading(false);
    }
  };

  // Google sign in
  const googleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) {
      return Promise.reject(new Error('No user is logged in'));
    }
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
    } finally {
      setLoading(false);
    }
  };

  // Memoize user info
  const UserInfo = useMemo(
    () => ({
      user,
      loading,
      createUser,
      login,
      logout,
      resetPassword,
      googleSignIn,
      updateUserProfile,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={UserInfo}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
