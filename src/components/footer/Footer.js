import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer">
    <Row className="justify-content-between text-center fs--1 mt-4 mb-3">
      <Col sm="auto">
        <p className="mb-0 text-600">
          (주) 주주생각
          <span className="d-none d-sm-inline-block">| </span>{' '}
          <a href="https://stoq.kr">서비스약관</a>
          <span className="d-none d-sm-inline-block">| </span>{' '}
          <a href="https://stoq.kr">개인정보 처리방침</a>
          <span className="d-none d-sm-inline-block">| </span>{' '}
          <a href="https://stoq.kr">개인정보 제3자 제공동의</a>
        </p>
      </Col>
      <Col sm="auto">
        <p className="mb-0 text-600">
          <br className="d-sm-none" /> {new Date().getFullYear()} &copy;{' '}
          <a href="https://stoq.kr">회사소개</a>
        </p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
