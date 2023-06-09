import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CONFIG } from 'store/slices/Config';

const renderTooltip = props => (
  <Tooltip style={{ position: 'fixed' }} id="button-tooltip" {...props}>
    Toggle Navigation
  </Tooltip>
);

const ToggleButton = () => {
  const {
    config: { isNavbarVerticalCollapsed, isFluid, isRTL }
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleClick = () => {
    document
      .getElementsByTagName('html')[0]
      .classList.toggle('navbar-vertical-collapsed');
    dispatch(
      SET_CONFIG({
        key: 'isNavbarVerticalCollapsed',
        value: !isNavbarVerticalCollapsed
      })
    );
  };

  return (
    <OverlayTrigger
      placement={
        isFluid ? (isRTL ? 'bottom' : 'right') : isRTL ? 'bottom' : 'left'
      }
      overlay={renderTooltip}
    >
      <div className="toggle-icon-wrapper">
        <Button
          variant="link"
          className="navbar-toggler-humburger-icon navbar-vertical-toggle"
          id="toggleNavigationTooltip"
          onClick={handleClick}
        >
          <span className="navbar-toggle-icon">
            <span className="toggle-line" />
          </span>
        </Button>
      </div>
    </OverlayTrigger>
  );
};

export default ToggleButton;
