
import React from 'react';
import './loading.css';

const Loading = ({ show = true }) => {
  return show ? (
    <div className="loading-overlay">
      <div className="loading-backdrop"></div>
      <div className="loading-circle"></div>
    </div>
  ) : null;
};

export default Loading;
