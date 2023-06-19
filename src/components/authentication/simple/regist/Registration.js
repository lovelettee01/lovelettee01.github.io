import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import Section from 'components/common/Section';
import Logo from 'components/common/Logo';
import RegistMain from './RegistMain';

const Registration = ({ variant, validation, progressBar }) => {
  return (
    <Section className="py-0">
      <Row className="justify-content-center pt-6">
        <Col sm={10} lg={7} className="col-xxl-5">
          <Logo width={45} textClass="fs-4" />
          <RegistMain
            variant={variant}
            validation={validation}
            progressBar={progressBar}
          />
        </Col>
      </Row>
    </Section>
  );
};

Registration.propTypes = {
  variant: PropTypes.oneOf(['pills']),
  validation: PropTypes.bool,
  progressBar: PropTypes.bool
};

export default Registration;
