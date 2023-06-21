import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { AuthHealthCheck } from 'components/authentication/AuthCheck';
import Loading from 'components/common/Loading';
import Section from 'components/common/Section';
import Logo from 'components/common/Logo';

const RegistLayout = () => {
  const { pathname } = useLocation();
  const { isAuth } = AuthHealthCheck({ isHealthCheck: true, key: pathname });
  if (isAuth === 'Loading') return <Loading />;
  else if (isAuth === 'Success') return <Navigate to="/" replace />;
  return (
    <Section className="py-0">
      <Row className="justify-content-center pt-6">
        <Col sm={10} lg={7} className="col-xxl-5">
          <Logo width={45} textClass="fs-4" />
          <Outlet />
        </Col>
      </Row>
    </Section>
  );
};

export default RegistLayout;
