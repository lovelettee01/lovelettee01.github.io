import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Button, CloseButton, Modal, Card, Form } from 'react-bootstrap';

import WizardInput from 'components/common/WizardInput';
import FalconCardHeader from 'components/common/FalconCardHeader';

import { withdrawalUser } from 'store/slices/User';

const ConfirmPop = ({ modal, setModal }) => {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const validate = true;
  const dispatch = useDispatch();
  const onSubmitData = data => {
    alert('삭제는 확인해보고 API 호출 예정');
    if (validate) return;
    dispatch(withdrawalUser(data)).then(res => {
      const resData = res.payload;
      if (!resData.success) {
        toast.error(resData.message, {
          theme: 'colored'
        });
      } else {
        navigate('/');
      }
    });
  };

  const onSubmitHandler = () => {
    formRef.current.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    );
  };

  const onError = () => {};

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
            Deactivate Profile
          </Modal.Title>
          <CloseButton
            className="btn btn-circle btn-sm transition-base p-0"
            onClick={() => setModal(!modal)}
          />
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger">
            Please enter your e-mail correctly to delete your account.
          </p>
          <Form
            noValidate
            onSubmit={handleSubmit(onSubmitData, onError)}
            ref={formRef}
          >
            <WizardInput
              errors={errors}
              label="Confirm E-mail"
              name="confirmEmail"
              formGroupProps={{ className: 'mb-3' }}
              formControlProps={{
                ...register('confirmEmail', {
                  required: 'Confirm Email field is required',
                  pattern: {
                    value:
                      /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
                    message: 'Email must be valid'
                  },
                  validate: value =>
                    currentUser.email === value ||
                    'Invalid profile email information.'
                }),
                autoFocus: true
              }}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onSubmitHandler}>
            Deactivate
          </Button>
          <Button onClick={() => setModal(!modal)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DangerZone = () => {
  const [confirmPop, setConfirmPop] = useState(false);

  const handleComfirmOpen = e => {
    e.preventDefault();
    setConfirmPop(true);
  };
  return (
    <>
      <ConfirmPop modal={confirmPop} setModal={setConfirmPop} />
      <Card>
        <FalconCardHeader title="Danger Zone" />
        <Card.Body className="bg-light">
          <h5 className="mb-0">Delete this Profile</h5>
          <p className="fs--1">
            Once you delete a Profile, there is no going back. Please be
            certain.
          </p>
          <Button
            onClick={handleComfirmOpen}
            variant="falcon-danger"
            className="w-100"
          >
            Deactivate Profile
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

ConfirmPop.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired
};

export default DangerZone;
