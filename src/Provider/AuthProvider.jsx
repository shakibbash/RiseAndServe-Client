import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useMemo, useState, useContext } from "react";
import { auth } from "../../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";
import Loader from "../Components/Loader";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Watch Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Always get a fresh Firebase ID token
          const token = await currentUser.getIdToken(true);
          localStorage.setItem("riseAndServeToken", token);
          localStorage.setItem("riseAndServeEmail", currentUser.email);
        } catch (err) {
          console.error("Failed to get Firebase token:", err);
          localStorage.removeItem("riseAndServeToken");
          localStorage.removeItem("riseAndServeEmail");
        }
      } else {
        // User logged out
        localStorage.removeItem("riseAndServeToken");
        localStorage.removeItem("riseAndServeEmail");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Create user (Email/Password)
  const createUser = async (email, password) => {
  setLoading(true);
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken(true);
    localStorage.setItem("riseAndServeToken", token);
    localStorage.setItem("riseAndServeEmail", result.user.email);
    return result;
  } finally {
    setLoading(false);
  }
}

  // Login (Email/Password)
const login = async (email, password) => {
  setLoading(true);
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Get fresh Firebase ID token
    const token = await result.user.getIdToken(true);
    localStorage.setItem("riseAndServeToken", token);
    localStorage.setItem("riseAndServeEmail", result.user.email);
    return result;
  } finally {
    setLoading(false);
  }
};

  // Logout
  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem("riseAndServeToken");
    localStorage.removeItem("riseAndServeEmail");
    await signOut(auth);
    setLoading(false);
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
      const token = await result.user.getIdToken(true);
      localStorage.setItem("riseAndServeToken", token);
      localStorage.setItem("riseAndServeEmail", result.user.email);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // GitHub sign in
  const githubSignIn = async () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(true);
      localStorage.setItem("riseAndServeToken", token);

      // ✅ FIX: Store email for joined events route
      if (result.user.email) {
        localStorage.setItem("riseAndServeEmail", result.user.email);
      }

      return result;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser)
      return Promise.reject(new Error("No user logged in"));
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
    } finally {
      setLoading(false);
    }
  };

  const UserInfo = useMemo(
    () => ({
      user,
      loading,
      createUser,
      login,
      logOut,
      resetPassword,
      googleSignIn,
      githubSignIn,
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

// Custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
