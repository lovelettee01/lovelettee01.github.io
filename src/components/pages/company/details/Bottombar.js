import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { useSelector } from 'react-redux';

const Bottombar = ({ inViewport }) => {
  const {
    config: { navbarCollapsed }
  } = useSelector(state => state);
  return (
    <Card
      className={`bottom-bar rounded-0 d-lg-none ${
        inViewport || navbarCollapsed ? 'hide' : 'show'
      }`}
    >
      <Card.Body className="py-2">
        <Flex className="gap-3 flex-between-center">
          <h2 className="fw-medium d-flex align-items-center">
            참여지분 : 47.49{' '}
            <span className="ms-2 fs--1 text-500">주식수 : 100주</span>
          </h2>
          <Button variant="primary" size="lg" className="fs-0 flex-1">
            가입하기
          </Button>
        </Flex>
      </Card.Body>
    </Card>
  );
};

Bottombar.propTypes = {
  inViewport: PropTypes.bool
};

export default Bottombar;
