import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';

import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import loginAvatar from 'assets/img/team/avatar.png';
import Avatar from 'components/common/Avatar';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { SET_CONFIG } from 'store/slices/Config';

const TopNavRightSideNavItem = () => {
  const {
    auth: { isLoggedIn, user },
    config: { isDark, isRTL }
  } = useSelector(state => {
    console.log(state);
    return state;
  });
  const dispatch = useDispatch();

  return (
    <Nav
      navbar
      className="navbar-nav-icons ms-auto flex-row align-items-center"
      as="ul"
    >
      <Nav.Item as={'li'}>
        <Nav.Link
          className="px-2 theme-control-toggle"
          onClick={() =>
            dispatch(SET_CONFIG({ key: 'isDark', value: !isDark }))
          }
        >
          <OverlayTrigger
            key="left"
            placement={isRTL ? 'bottom' : 'left'}
            overlay={
              <Tooltip style={{ position: 'fixed' }} id="ThemeColor">
                {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              </Tooltip>
            }
          >
            <div className="theme-control-toggle-label">
              <FontAwesomeIcon
                icon={isDark ? 'sun' : 'moon'}
                className="fs-0"
              />
            </div>
          </OverlayTrigger>
        </Nav.Link>
      </Nav.Item>

      {isLoggedIn ? (
        <ProfileDropdown user={user} />
      ) : (
        <Nav.Item as="li">
          <Nav.Link as={Link} to="/signin" className="px-0 position-relative">
            <Avatar src={loginAvatar} />
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default TopNavRightSideNavItem;
