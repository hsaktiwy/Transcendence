import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ show }) => {
  if (!show) return null;

  return (
    <div id="loading-screen">
      <div id="loading-spinner"></div>
    </div>
  );
};

export default LoadingScreen;
