import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap';

const CompanyPricing = ({
  register,
  isOpenScheduleModal,
  setIsOpenScheduleModal
}) => {
  return (
    <>
      <Card className="mb-3 mb-lg-0">
        <Card.Header as="h5">Set Pricing</Card.Header>
        <Card.Body className="bg-light">
          <Row className="gx-2 gy-3">
            <Col xs="12">
              <Form.Group controlId="companyTitle">
                <Form.Label>
                  Base Price
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        style={{ position: 'fixed' }}
                        id="basePriceTooltip"
                      >
                        Company regular price
                      </Tooltip>
                    }
                  >
                    <span className="ms-2 text-primary fs--1">
                      <FontAwesomeIcon icon="question-circle" />
                    </span>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="basePrice"
                  required
                  {...register('basePrice')}
                />
              </Form.Group>
            </Col>
            <Col xs="12">
              <Form.Group controlId="companyTitle">
                <Form.Label>
                  Discounted Price
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        style={{ position: 'fixed' }}
                        id="basePriceTooltip"
                      >
                        Company discounted price
                      </Tooltip>
                    }
                  >
                    <span className="ms-2 text-primary fs--1">
                      <FontAwesomeIcon icon="question-circle" />
                    </span>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="discountedPrice"
                  required
                  {...register('discountedPrice')}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="text-end">
            <Button
              variant="link"
              size="sm"
              className="fw-medium fs--1"
              onClick={() => {
                setIsOpenScheduleModal(!isOpenScheduleModal);
              }}
            >
              Schedule Discount
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

CompanyPricing.propTypes = {
  register: PropTypes.func.isRequired,
  isOpenScheduleModal: PropTypes.bool,
  setIsOpenScheduleModal: PropTypes.func.isRequired
};

export default CompanyPricing;
