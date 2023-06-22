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
              ㈜주주생각 <br className="d-sm-none" />
              • 사업자 등록번호 : 159-81-02707 • 대표 : 김진수
              <br className="d-sm-none" />
              (06644) 서울시 서초구 반포대로 30길 81, 11층 1115A호
              <br className="d-sm-none" />
              대표번호 : 02-6953-1363
            </p>
          </Col>
        </Row>
        <Row className="justify-content-between text-center fs--1 mb-3">
          <Col sm="auto">
            <p className="mb-0 text-600">
              <Link
                onClick={() => {
                  handleAgreeClick('terms');
                }}
              >
                서비스약관
              </Link>
              <span> | </span>{' '}
              <Link
                onClick={() => {
                  handleAgreeClick('policy');
                }}
              >
                개인정보 처리방침
              </Link>
              <span className=""> | </span>{' '}
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
              <a href="https://stoq.kr">㈜주주생각</a>
            </p>
          </Col>
        </Row>
      </footer>
    </>
  );
};

export default Footer;
