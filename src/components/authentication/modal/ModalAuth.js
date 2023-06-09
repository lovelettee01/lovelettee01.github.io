import React, { useState } from 'react';
import { CloseButton, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from 'components/authentication/LoginForm';

export default function MadalAuth() {
  //const {show, setShow, }
  let {
    state: { open }
  } = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState(open);

  const handleClose = () => {
    setShow(false);
    navigate(-1);
  };

  return (
    <Modal show={show} onHide={handleClose} className="mt-4">
      <Modal.Header className="bg-shape modal-shape-header px-4 position-relative">
        <div className="position-relative z-index-1 light">
          <h4 className="mb-0 text-white" id="authentication-modal-label">
            Register
          </h4>
          <p className="fs--1 mb-0 text-white">
            Please create your free Falcon account
          </p>
        </div>
        <CloseButton
          variant="white"
          className="position-absolute end-0 me-2 mt-2 top-0"
          onClick={handleClose}
        />
      </Modal.Header>
      <Modal.Body className="p-4">
        <LoginForm layout="split" hasLabel />
      </Modal.Body>
    </Modal>
  );
}
