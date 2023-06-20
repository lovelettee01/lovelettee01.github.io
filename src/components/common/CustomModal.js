import React from 'react';
import PropTypes from 'prop-types';
import { Button, CloseButton, Modal } from 'react-bootstrap';
import { TRUE } from 'sass';

const CustomModal = ({
  modal,
  showModal,
  title,
  message,
  modalProps,
  optionProps
}) => {
  const modalOption = Object.assign(
    {
      confirm: false,
      showTitle: true,
      showClose: TRUE,
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
    console.log(id, e);
    if (typeof modalOption[id].handleClick === 'function') {
      modalOption[id].handleClick();
    }
    showModal(!modal);
  };

  return (
    <>
      <Modal
        show={modal}
        onHide={() => showModal(!modal)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        {...modalProps}
      >
        <Modal.Header
          className={
            !modalOption.showTitle && !modalOption.showClose ? 'd-none' : ''
          }
        >
          {modalOption.showTitle && (
            <Modal.Title id="contained-modal-title-vcenter">
              {title}
            </Modal.Title>
          )}
          {modalOption.showClose && (
            <CloseButton
              className="btn btn-circle btn-sm transition-base p-0"
              onClick={() => showModal(!modal)}
            />
          )}
        </Modal.Header>

        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick} id="ok">
            {modalOption.ok.text}
          </Button>
          {modalOption.confirm && (
            <Button onClick={handleClick} id="cancel">
              {modalOption.cancel.text}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

CustomModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  modalProps: PropTypes.object,
  optionProps: PropTypes.object
};

export default CustomModal;
