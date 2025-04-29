
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to the Auth page which is our starting point
  return <Navigate to="/auth" replace />;
};

export default Index;
