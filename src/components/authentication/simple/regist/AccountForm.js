import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import WizardInput from 'components/common/WizardInput';

const AccountForm = ({ register, errors, watch }) => {
  const user = {};
  return (
    <>
      <WizardInput
        type="text"
        label="Name"
        name="name"
        errors={errors}
        formGroupProps={{ className: 'mb-3' }}
        formControlProps={{
          ...register('name', {
            value: user.name,
            required: 'Name field is required'
          })
        }}
      />

      <WizardInput
        type="email"
        errors={errors}
        label="Email*"
        name="email"
        formGroupProps={{ className: 'mb-3' }}
        formControlProps={{
          ...register('email', {
            value: user.email,
            required: 'Email field is required',
            pattern: {
              value:
                /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
              message: 'Email must be valid'
            }
          })
        }}
      />

      <Row className="g-2 mb-3">
        <WizardInput
          type="password"
          errors={errors}
          label="Password*"
          name="password"
          formGroupProps={{ as: Col, sm: 6 }}
          formControlProps={{
            ...register('password', {
              value: user.password,
              required: 'You must specify a password',
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
          label="Confirm Password*"
          name="confirmPassword"
          formGroupProps={{ as: Col, sm: 6 }}
          formControlProps={{
            ...register('confirmPassword', {
              value: user.password,
              required: 'Confirm Password field is required',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters'
              },
              maxLength: {
                value: 20,
                message: 'Password must be no more than 20 characters'
              },
              validate: value =>
                value === watch('password') || 'The password do not match'
            })
          }}
        />
      </Row>

      <WizardInput
        type="checkbox"
        errors={errors}
        label={
          <>
            I accept the <Link to="#!"> terms</Link> and{' '}
            <Link to="#!"> privacy policy</Link>
          </>
        }
        name="agreedToTerms"
        formControlProps={{
          ...register('agreedToTerms', {
            required: 'You need to agree the terms and privacy policy.'
          })
        }}
      />
    </>
  );
};

AccountForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func
};

export default AccountForm;
