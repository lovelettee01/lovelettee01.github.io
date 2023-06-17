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
