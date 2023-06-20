import React from 'react';
import { Row } from 'react-bootstrap';
import Section from 'components/common/Section';

const PrivacyPolicy2 = () => {
  return (
    <>
      <Section className="py-0">
        <Row className="justify-content-center pt-2">
          <h2 className="mb-4 fw-bold">개인(신용)정보 제3자 제공 동의서</h2>
          <p className="mb-3">
            주식회사 주주생각(이하 “회사”)이 제공하는 서비스와 관련하여 본인의
            개인(신용)정보를 제3 자에게 제공하고자 하는 경우 「신용정보의 이용
            및 보호에 관한 법률」 「개인정보보호법」 등 관련 법규에 따라 이용자
            본인의 동의가 필요합니다.
          </p>

          <h4 className="mt-4 mb-2 fw-bold">제공 받는 자</h4>
          <p className="mb-3">(주)쿠콘</p>

          <h4 className="mt-4 mb-2 fw-bold">제공 받는 자의 이용 목적</h4>
          <p className="mb-3">
            - ‘나의 자산’ 서비스의 제공 및 관리(자산 통합조회, 자산현황 조회,
            캘린더 및 소비습관 관리 기능 등)
            <br />
            - 자산관리 서비스 관련 민원 및 문의 사항 처리
            <br />
            - 기타 법령상 의무 이행
            <br />- 서비스 이용 관련 금융사고 조사 및 분쟁 해결
          </p>

          <h4 className="mt-4 mb-2 fw-bold">제공 항목 - 개인(신용)정보</h4>
          <p className="mb-3">이름, 성별, 생년월일, 휴대폰번호, CI</p>
        </Row>
      </Section>
    </>
  );
};
export default PrivacyPolicy2;
