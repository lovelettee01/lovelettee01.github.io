import React from 'react';
import corner4 from 'assets/img/illustrations/corner-4.png';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Background from 'components/common/Background';

const CreateCompanyHeader = () => {
  return (
    <Card className="mb-3">
      <Background
        image={corner4}
        className="bg-card d-none d-md-block"
        style={{
          borderTopRightRadius: '0.375rem',
          borderBottomRightRadius: '0.375rem'
        }}
      />
      <Card.Body className="position-relative">
        <Row>
          <Col xl={10}>
            <h3>Create A New Company</h3>
            <p className="mb-0">
              Enlighten the world with your knowledge. Use our Company Creator
              to design a well-structured company; set whatever price you feel
              worthy of, and publish at our platform.
              <br />
              or,
              <br className="d-lg-none" />
              Want to edit your existing company? Jump to
              <Link to="/e-learning/company/company-grid"> Your companys</Link>
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CreateCompanyHeader;
