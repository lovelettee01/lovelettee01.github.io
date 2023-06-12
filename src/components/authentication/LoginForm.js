import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

//import Divider from 'components/common/Divider';
//import SocialAuthButtons from './SocialAuthButtons';

import { useDispatch } from 'react-redux';
import { signIn } from 'store/slices/Auth';

const LoginForm = ({ hasLabel, layout }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { state } = useLocation();

  // State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    const params = {
      phoneNumber: '01000000001',
      email: formData.email,
      password: formData.password,
      remember: formData.remember
    };
    dispatch(signIn(params))
      .then(res => {
        console.log(`Login Dispatch Then`, res);
        const payload = res.payload;
        if (!payload.success) {
          toast.error(payload.message, {
            theme: 'colored'
          });
        } else {
          navigate(state?.path || '/');
        }
      })
      .catch(err => {
        console.log(`Login Dispatch Catch`, err);
      });
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
            />
            <Form.Check.Label className="mb-0 text-700">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          <Link
            className="fs--1 mb-0"
            to={`/authentication/${layout}/forgot-password`}
          >
            Forgot Password?
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || !formData.password}
        >
          Log in
        </Button>
      </Form.Group>

      {/* <Divider className="mt-4">or log in with</Divider>
      <SocialAuthButtons /> */}
    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;
