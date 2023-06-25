import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Lottie from 'lottie-react';

import Flex from 'components/common/Flex';
import FalconCloseButton from 'components/common/FalconCloseButton';
import animationData from 'assets/img/animated-icons/warning-light.json';
import IconButton from './IconButton';
import { mergeObject } from 'helpers/utils';

const WizardModal = ({
  modal,
  showModal,
  message,
  modalProps,
  optionProps = {}
}) => {
  const modalOption = mergeObject(
    {
      confirm: false,
      showClose: true,
      showButton: false,
      ok: {
        text: '확인',
        handleClick: null
      },
      cancel: {
        text: '취소',
        handleClick: null
      }
    },
    optionProps
  );
  const handleClick = e => {
    const {
      target: { id }
    } = e;
    if (typeof modalOption[id].handleClick === 'function') {
      modalOption[id].handleClick();
    }
    showModal(!modal);
  };
  return (
    <Modal show={modal} centered dialogClassName="wizard-modal" {...modalProps}>
      <Modal.Body className="p-4">
        {modalOption.showClose && (
          <FalconCloseButton
            id="ok"
            size="sm"
            className="position-absolute top-0 end-0 me-2 mt-2"
            onClick={handleClick}
          />
        )}
        <Flex justifyContent="center" alignItems="center">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: '100px' }}
          />
          <p className="mb-0 flex-1">{message}</p>
        </Flex>
        {modalOption.showButton && (
          <Flex justifyContent="end" alignItems="right">
            <IconButton
              className="rounded-pill me-1 mb-1"
              variant="outline-warning"
              icon="align-left"
              transform="shrink-3"
              onClick={handleClick}
              id="ok"
            >
              {modalOption.ok.text}
            </IconButton>
            {modalOption.confirm && (
              <IconButton
                className="rounded-pill ms-3 me-1 mb-1"
                variant="outline-secondary"
                icon="align-left"
                transform="shrink-3"
                onClick={handleClick}
                id="cancel"
              >
                {modalOption.cancel.text}
              </IconButton>
            )}
          </Flex>
        )}
      </Modal.Body>
    </Modal>
  );
};

WizardModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  modalProps: PropTypes.object,
  optionProps: PropTypes.object
};

export default WizardModal;
