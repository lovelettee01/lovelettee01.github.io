import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import WizardInput from 'components/common/WizardInput';
import FalconCardHeader from 'components/common/FalconCardHeader';

import { passwordChange } from 'store/slices/Auth';

const ChangePassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const dispatch = useDispatch();
  const onSubmitData = data => {
    dispatch(passwordChange(data)).then(res => {
      const resData = res.payload;
      if (!resData.success) {
        toast.error(resData.message, {
          theme: 'colored'
        });
      } else {
        navigate('/user/profile');
      }
    });
  };

  const onError = () => {};

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Change Password" />
      <Card.Body className="bg-light">
        <Form noValidate onSubmit={handleSubmit(onSubmitData, onError)}>
          <WizardInput
            type="password"
            errors={errors}
            label="Old Password*"
            name="oldPassword"
            formGroupProps={{ className: 'mb-3' }}
            formControlProps={{
              ...register('oldPassword', {
                required: 'You must specify a Old password',
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
            label="New Password*"
            name="newPassword"
            formGroupProps={{ className: 'mb-3' }}
            formControlProps={{
              ...register('newPassword', {
                required: 'You must specify a New password',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters'
                },
                maxLength: {
                  value: 20,
                  message: 'Password must be no more than 20 characters'
                },
                validate: value =>
                  value !== watch('oldPassword') ||
                  'Don`t same password as the old password.'
              })
            }}
          />
          <WizardInput
            type="password"
            errors={errors}
            label="Confirm Password*"
            name="confirmPassword"
            formGroupProps={{ className: 'mb-3' }}
            formControlProps={{
              ...register('confirmPassword', {
                required: 'Confirm Password field is required',
                validate: value =>
                  value === watch('newPassword') ||
                  'The new password do not match'
              })
            }}
          />
          <Button className="w-100" type="submit">
            Update Password
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ChangePassword;
