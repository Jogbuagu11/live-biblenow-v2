
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to the Home page instead of Auth page
  return <Navigate to="/home" replace />;
};

export default Index;
