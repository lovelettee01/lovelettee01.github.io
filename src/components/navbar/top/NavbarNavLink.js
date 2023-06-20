import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CONFIG } from 'store/slices/Config';

const NavbarNavLink = ({ title, route }) => {
  const { navbarCollapsed, showBurgerMenu } = useSelector(
    state => state.config
  );

  const dispatch = useDispatch();
  const handleClick = () => {
    if (navbarCollapsed) {
      dispatch(SET_CONFIG({ key: 'navbarCollapsed', value: !navbarCollapsed }));
    }
    if (showBurgerMenu) {
      dispatch(SET_CONFIG({ key: 'showBurgerMenu', value: !showBurgerMenu }));
    }
  };
  return (
    <Nav.Link
      as={title ? 'p' : Link}
      className={classNames('fw-medium', {
        'text-500': !route?.active,
        'text-700 mb-0 fw-bold': title,
        'py-1': !title,
        'link-600': !title && route?.active
      })}
      to={route?.to}
      onClick={handleClick}
    >
      {title ? title : route.name}
    </Nav.Link>
  );
};

NavbarNavLink.propTypes = {
  title: PropTypes.string,
  route: PropTypes.shape({
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    active: PropTypes.bool
  })
};

export default NavbarNavLink;
