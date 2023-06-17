import FalconCardHeader from 'components/common/FalconCardHeader';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DangerZone = () => {
  return (
    <Card>
      <FalconCardHeader title="Danger Zone" />
      <Card.Body className="bg-light">
        <h5 className="mb-0">Delete this Profile</h5>
        <p className="fs--1">
          Once you delete a Profile, there is no going back. Please be certain.
        </p>
        <Button as={Link} to="#!" variant="falcon-danger" className="w-100">
          Deactivate Profile
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DangerZone;
