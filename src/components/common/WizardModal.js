import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Lottie from 'lottie-react';

import Flex from 'components/common/Flex';
import FalconCloseButton from 'components/common/FalconCloseButton';
import animationData from 'assets/img/animated-icons/warning-light.json';

const WizardModal = ({ modal, setModal, message }) => {
  return (
    <Modal show={modal} centered dialogClassName="wizard-modal">
      <Modal.Body className="p-4">
        <FalconCloseButton
          size="sm"
          className="position-absolute top-0 end-0 me-2 mt-2"
          onClick={() => setModal(!modal)}
        />
        <Flex justifyContent="center" alignItems="center">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: '100px' }}
          />
          <p className="mb-0 flex-1">{message}</p>
        </Flex>
      </Modal.Body>
    </Modal>
  );
};

WizardModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default WizardModal;
