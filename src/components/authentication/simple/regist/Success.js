import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';
import celebration from 'assets/img/animated-icons/celebration.json';

const Success = () => {
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate('/');
  };
  return (
    <>
      <Row>
        <Col className="text-center">
          <div className="wizard-lottie-wrapper">
            <div className="wizard-lottie mx-auto">
              <Lottie animationData={celebration} loop={true} />
            </div>
          </div>
          <h4 className="mb-1">Your account is all set!</h4>
          <p className="fs-0">Now you can access to your account</p>
          <Button
            color="primary"
            className="px-5 my-3"
            onClick={handleStartClick}
          >
            Start Over
          </Button>
        </Col>
      </Row>
    </>
  );
};

Success.propTypes = {
  success: PropTypes.func.isRequired
};

export default Success;
