
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Always redirect to the Home page
  return <Navigate to="/home" replace />;
};

export default Index;
