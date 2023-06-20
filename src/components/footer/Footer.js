import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AgreementModal from 'components/agreement/AgreementModal';
import { useState } from 'react';

const Footer = () => {
  const [agree, setAgree] = useState('');
  const [modal, showModal] = useState(false);

  const handleAgreeClick = type => {
    setAgree(type);
    showModal(true);
  };

  return (
    <>
      {modal && (
        <AgreementModal modal={modal} showModal={showModal} type={agree} />
      )}
      <footer className="footer">
        <Row className="justify-content-between text-center fs--1 mt-4 mb-3">
          <Col sm="auto">
            <p className="mb-0 text-600">
              (주) 주주생각
              <span className="d-none d-sm-inline-block">| </span>{' '}
              <Link
                onClick={() => {
                  handleAgreeClick('terms');
                }}
              >
                서비스약관
              </Link>
              <span className="d-none d-sm-inline-block">| </span>{' '}
              <Link
                onClick={() => {
                  handleAgreeClick('policy');
                }}
              >
                개인정보 처리방침
              </Link>
              <span className="d-none d-sm-inline-block">| </span>{' '}
              <Link
                onClick={() => {
                  handleAgreeClick('policy2');
                }}
              >
                개인정보 제3자 제공동의
              </Link>
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
    </>
  );
};

export default Footer;
