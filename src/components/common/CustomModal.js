import React from 'react';
import PropTypes from 'prop-types';
import { Button, CloseButton, Modal } from 'react-bootstrap';

const CustomModal = ({ modal : true, setModal, optionProps }) => {
  return (
    <>
      <Modal
        show={modal}
        onHide={() => setModal(!modal)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
          <CloseButton
            className="btn btn-circle btn-sm transition-base p-0"
            onClick={() => setModal(!modal)}
          />
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModal(!modal)}>OK</Button>
          <Button onClick={() => setModal(!modal)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

CustomModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  optionProps: PropTypes.object
};

export default CustomModal;
