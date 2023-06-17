import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import ProfileBanner from '../ProfileBanner';
import ProfileSettings from './ProfileSettings';
import ChangePassword from './ChangePassword';
import DangerZone from './DangerZone';

import coverSrc from 'assets/img/generic/4.jpg';
import avatar from 'assets/img/team/avatar.png';

const Settings = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    if (!currentUser) {
      alert('회원정보가 존재하지 않습니다.\n메인페이지로 이동합니다.');
      navigate('/');
    }
  }, []);
  if (!currentUser) return;
  // const currentUser = {
  //   id: 23,
  //   email: 'user1@example.com',
  //   ci: 'AZFPtUt9cWKTzOJpGscstBflEKcTd4gHuFqjWfB9fXNb+dK+49xo4O+mhF7VIs7daUFROppZWdsh7+Ajkg0C8A==',
  //   nickName: 'user123',
  //   realName: '일23',
  //   phoneNumber: '01000000001',
  //   gender: 'female',
  //   isForeigner: false,
  //   isCertificatedSelf: true,
  //   nationality: '',
  //   birthDate: '1983-02-01',
  //   profileImageUrl:
  //     'https://stoq-public.s3.ap-northeast-2.amazonaws.com/1abb9456-af8f-4bf1-b2e1-a626e1312569.jpg',
  //   snsType: null,
  //   telecomCode: '04',
  //   encryptedName: 'tDrsE2c5I0t7qG90OZEB9Q==',
  //   encryptedBirthday: 'Qhbv+RTlDY+agX733v3q4w==',
  //   encryptedPhoneNumber: 'idJ3Sd/TrQUzpQTkMh2RTg==',
  //   createdAt: '2022-12-20T10:15:31.309153+00:00'
  // };
  //프로필 이미지
  const profileImg = currentUser.profileImageUrl || avatar;
  return (
    <>
      <ProfileBanner>
        <ProfileBanner.Header
          coverSrc={coverSrc}
          avatar={profileImg}
          className="mb-8"
        />
      </ProfileBanner>
      <Row className="g-3">
        <Col lg={8}>
          <ProfileSettings user={currentUser} />
        </Col>
        <Col lg={4}>
          <div className="sticky-sidebar">
            <ChangePassword />
            <DangerZone />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Settings;
