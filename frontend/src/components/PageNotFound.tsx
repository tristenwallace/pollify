import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const NotFoundPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.users.currentUser);
  const location = useLocation();

  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div>
      <h1>404 - Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
