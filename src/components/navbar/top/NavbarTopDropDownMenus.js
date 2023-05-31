import React from 'react';
import NavbarDropdown from './NavbarDropdown';
import { pageRoutes } from 'routes/siteMaps';
import NavbarDropdownApp from './NavbarDropdownApp';

const NavbarTopDropDownMenus = () => {
  return (
    <>
      <NavbarDropdown title="Links">
        <NavbarDropdownApp items={pageRoutes.children} />
      </NavbarDropdown>
    </>
  );
};

export default NavbarTopDropDownMenus;
