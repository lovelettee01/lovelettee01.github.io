import React, { useEffect } from 'react';
import Loading from 'components/common/Loading';
import { toast } from 'react-toastify';

import VerifiedBadge from 'components/common/VerifiedBadge';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ProfileBanner from '../ProfileBanner';

import coverSrc from 'assets/img/generic/4.jpg';
import avatar from 'assets/img/team/avatar.png';

import { useSelector, useDispatch } from 'react-redux';
import { userProfile } from 'store/slices/User';

const ProfileInfo = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      dispatch(userProfile())
        .then(res => {
          console.log('ProfileInfo Then', res);
          const data = res.payload;
          if (!data.success) {
            toast.error('회원정보 조회 중 오류가 발생하였습니다.', {
              theme: 'colored'
            });
            setTimeout(() => {
              navigate('/errors/500');
            }, 500);
          }
        })
        .catch(error => {
          console.log('ProfileInfo error', error);
          const { data } = error;
          toast.error(data.message, {
            theme: 'colored'
          });
          navigate('/errors/500');
        });
    }
  }, [dispatch]);
  if (!currentUser) return <Loading />;

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
