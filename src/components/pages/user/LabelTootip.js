import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LabelTootip = ({ label, tooltip }) => {
  return (
    <>
      {label}
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip style={{ position: 'fixed' }}>{tooltip}</Tooltip>}
      >
        <span>
          <FontAwesomeIcon icon="question-circle" className="mx-2" />
        </span>
      </OverlayTrigger>
    </>
  );
};

export default LabelTootip;
