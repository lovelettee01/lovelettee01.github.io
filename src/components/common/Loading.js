import React from 'react';
import { Modal } from 'react-bootstrap';

const Loading = () => (
  <Modal
    show={true}
    centered
    dialogClassName="loading-modal"
    contentClassName="border-0"
    style={{ backgroundColor: 'rgba(30,30,30,0.5)' }}
  >
    <div className="position-fixed top-50 start-50 translate-middle">
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </Modal>
);

export default Loading;
