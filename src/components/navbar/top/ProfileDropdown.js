import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
//import Avatar from 'components/common/Avatar';
//import loginAvatar from 'assets/img/team/avatar.png';

const ProfileDropdown = () => {
  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="#!"
        className="pe-0 ps-2 nav-link"
      >
        {/* <Avatar src={loginAvatar} /> */}
        <FontAwesomeIcon
          icon="user-circle"
          className="me-2 text-700"
          style={{ height: '29px', width: '29px' }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <Dropdown.Item
            className="fw-bold text-warning"
            as={Link}
            to="/user/profile"
          >
            <FontAwesomeIcon icon="user" className="me-1" />
            <span>Profile</span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to="/signout">
            <FontAwesomeIcon icon="sign-out-alt" className="me-1" />
            Logout
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
