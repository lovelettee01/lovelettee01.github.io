import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Avatar from 'components/common/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileDropdown = ({ user }) => {
  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="#!"
        className="pe-0 ps-2 nav-link"
      >
        {user?.profileImageUrl ? (
          <Avatar className="mt-1" src={user.profileImageUrl} />
        ) : (
          <FontAwesomeIcon
            icon="user-circle"
            className="mt-1 text-700"
            style={{ height: '29px', width: '29px' }}
          />
        )}
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

ProfileDropdown.propTypes = {
  user: PropTypes.object
};

export default ProfileDropdown;
