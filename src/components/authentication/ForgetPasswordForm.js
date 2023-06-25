import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';

import { passwordResetToken } from 'store/slices/Auth';
import WizardInput from 'components/common/WizardInput';

const ForgetPasswordForm = () => {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const watchEmail = watch('email');

  const dispatch = useDispatch();
  const onSubmitData = data => {
    const params = {
      email: data.email,
      callback: `${location.protocol}//${location.host}/password_reset`
    };
    dispatch(passwordResetToken(params)).then(res => {
      const resData = res.payload;
      if (!resData.success) {
        toast.error(resData.message, {
          theme: 'colored'
        });
      } else {
        navigator(`/confirm_mail?email=${watchEmail}`);
      }
    });
  };

  const onError = () => {};

  return (
    <Form
      className="mt-4"
      noValidate
      onSubmit={handleSubmit(onSubmitData, onError)}
    >
      <WizardInput
        type="email"
        errors={errors}
        name="email"
        formGroupProps={{ className: 'mb-3' }}
        formControlProps={{
          ...register('email', {
            required: 'Email field is required',
            pattern: {
              value:
                /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
              message: 'Email must be valid'
            }
          })
        }}
      />

      <Form.Group className="mb-3">
        <Button className="w-100" type="submit" disabled={!watchEmail}>
          Send reset link
        </Button>
      </Form.Group>

      <Link className="fs--1 text-600" to="#!">
        I can't recover my account using this page
        <span className="d-inline-block ms-1"> &rarr;</span>
      </Link>
    </Form>
  );
};

export default ForgetPasswordForm;
