import React, { useEffect } from 'react';

import VerifiedBadge from 'components/common/VerifiedBadge';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ProfileBanner from '../ProfileBanner';

import coverSrc from 'assets/img/generic/4.jpg';
import avatar from 'assets/img/team/avatar.png';

import { useSelector } from 'react-redux';

const ProfileInfo = () => {
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
    <ProfileBanner>
      <ProfileBanner.Header avatar={profileImg} coverSrc={coverSrc} />
      <ProfileBanner.Body>
        <h4 className="mb-1">
          {`${currentUser.nickName} (${currentUser.realName})`}{' '}
          {currentUser.isCertificatedSelf ? <VerifiedBadge /> : null}
        </h4>
        <h5 className="fs-0 fw-normal">{currentUser.email}</h5>
        <p className="text-500">{currentUser.nationality}</p>
        <Button
          variant="falcon-primary"
          size="sm"
          className="px-3"
          as={Link}
          to="/user/settings"
        >
          정보수정
        </Button>
      </ProfileBanner.Body>
    </ProfileBanner>
  );
};

export default ProfileInfo;
