import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {

    if (!loading && !user && location.pathname !== '/login') {
      toast.error("Please log in to view this page");
    }
  }, [user, loading, location.pathname]);

  if (loading) return <Loader />; 
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children; 
};

export default PrivateRoute;