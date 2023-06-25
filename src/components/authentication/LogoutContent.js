import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoutImg from 'assets/img/icons/spot-illustrations/45.png';
import { signOut } from 'store/slices/Auth';
import Flex from 'components/common/Flex';

const LogoutContent = ({ layout = '', titleTag: TitleTag }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut());
  }, []);

  return (
    <>
      <img
        className="d-block mx-auto mb-4"
        src={logoutImg}
        alt="shield"
        width={100}
      />
      <TitleTag>See you again!</TitleTag>
      <p>
        STOQ를 이용해 주셔서 감사합니다.
        <br className="d-none d-sm-block" />
        정상적으로 로그아웃 되었습니다.
      </p>
      <Flex justifyContent="around" className="p-2 mb-2">
        <div>
          <Button as={Link} color="primary" size="sm" className="mt-3" to={`/`}>
            <FontAwesomeIcon
              icon="home"
              transform="shrink-4 down-1"
              className="me-1"
            />
            Home
          </Button>
        </div>
        <div>
          <Button
            as={Link}
            color="primary"
            size="sm"
            className="mt-3"
            to={
              layout === '' || layout === 'simple'
                ? `/signin`
                : `/${layout}/signin`
            }
          >
            <FontAwesomeIcon
              icon="chevron-left"
              transform="shrink-4 down-1"
              className="me-1"
            />
            Return to Login
          </Button>
        </div>
      </Flex>
    </>
  );
};

LogoutContent.propTypes = {
  layout: PropTypes.string,
  titleTag: PropTypes.string
};

LogoutContent.defaultProps = {
  layout: 'simple',
  titleTag: 'h4'
};

export default LogoutContent;
