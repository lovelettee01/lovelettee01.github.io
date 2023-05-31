import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Row, Col } from 'react-bootstrap';
import { getFlatRoutes } from 'helpers/utils';
import NavbarNavLink from './NavbarNavLink';

const NavbarDropdownPages = ({ items }) => {
  const routes = getFlatRoutes(items);

  return (
    <Row>
      <Col xs={6} md={4}>
        <Nav className="flex-column">
          {routes.unTitled.map(route => (
            <NavbarNavLink key={route.name} route={route} />
          ))}
        </Nav>
      </Col>
      <Col xs={6} md={4}>
        <NavbarNavLink label="E Learning" title="E Learning" />
        {routes.eLearning.map(route => (
          <NavbarNavLink key={route.name} route={route} />
        ))}
      </Col>
    </Row>
  );
};

NavbarDropdownPages.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      name: PropTypes.string.isRequired,
      to: PropTypes.string,
      children: PropTypes.array
    }).isRequired
  ).isRequired
};

export default NavbarDropdownPages;
