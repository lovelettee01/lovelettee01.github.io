import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import WizardInput from '../common/WizardInput';
import WizardModal from '../common/WizardModal';
import { passwordReset } from '../../store/slices/Auth';

const PasswordResetForm = ({ hasLabel }) => {
  const [modal, showModal] = useState(false);
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  useEffect(() => {
    if (!token) showModal(true);
  }, []);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const dispatch = useDispatch();
  const onSubmitData = data => {
    const params = { password: data.password, token };
    console.log('onSubmitData', params);
    dispatch(passwordReset(params)).then(res => {
      const resData = res.payload;
      if (!resData.success) {
        toast.error(resData.message, {
          theme: 'colored'
        });
      } else {
        toast.success('Login with your new password', {
          theme: 'colored'
        });
        navigate('/');
      }
    });
  };

  const onError = () => {};

  return (
    <>
      <WizardModal
        modal={modal}
        showModal={showModal}
        message={'잘못된 경로로 접근하였습니다.'}
        optionProps={{
          ok: {
            handleClick: () => {
              navigate('/');
            }
          }
        }}
      />
      <Form
        className={classNames('mt-3', { 'text-left': hasLabel })}
        noValidate
        onSubmit={handleSubmit(onSubmitData, onError)}
      >
        <WizardInput
          type="password"
          errors={errors}
          label={hasLabel && 'New Password*'}
          placeholder={hasLabel || 'New Password'}
          name="password"
          formGroupProps={{ className: 'mb-3' }}
          formControlProps={{
            ...register('password', {
              required: 'You must specify a New password',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters'
              },
              maxLength: {
                value: 20,
                message: 'Password must be no more than 20 characters'
              }
            })
          }}
        />
        <WizardInput
          type="password"
          errors={errors}
          label={hasLabel && 'Confirm Password*'}
          placeholder={hasLabel || 'Confirm Password'}
          name="confirmPassword"
          formGroupProps={{ className: 'mb-3' }}
          formControlProps={{
            ...register('confirmPassword', {
              required: 'Confirm Password field is required',
              validate: value =>
                value === watch('password') || 'The new password do not match'
            })
          }}
        />

        <Button
          type="submit"
          className="w-100"
          disabled={!watch('password') || !watch('confirmPassword')}
        >
          Set password
        </Button>
      </Form>
    </>
  );
};

PasswordResetForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default PasswordResetForm;
