import React from 'react';

const Loading = () => (
  <div className="position-fixed top-50 start-50 translate-middle">
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
);

export default Loading;
