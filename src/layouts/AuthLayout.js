import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { AuthHealthCheck } from 'components/authentication/AuthCheck';
import Loading from 'components/common/Loading';
import Logo from 'components/common/Logo';
import Section from 'components/common/Section';

const AuthLayout = () => {
  const { pathname } = useLocation();
  const { isAuth } = AuthHealthCheck({ isHealthCheck: true, key: pathname });
  if (isAuth === 'Loading') return <Loading />;
  else if (pathname !== '/signout' && isAuth === 'Success')
    return <Navigate to="/" replace />;
  return (
    <Section className="py-0">
      <Row className="flex-center min-vh-100 py-6">
        <Col sm={10} md={8} lg={6} xl={5} className="col-xxl-4">
          <Logo />
          <Card>
            <Card.Body className="p-4 p-sm-5">
              <Outlet />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Section>
  );
};

export default AuthLayout;
