import React from 'react';
import ProfileInfo from './ProfileInfo';
import MyPosts from './MyPosts';
import { Card } from 'react-bootstrap';

const Profile = () => {
  return (
    <>
      <ProfileInfo />
      <Card className="mb-3">
        <Card.Header className="bg-light">
          <h5 className="mb-0">My Post List</h5>
        </Card.Header>
        <Card.Body className="text-justify text-1000">
          <MyPosts />
        </Card.Body>
      </Card>
    </>
  );
};

export default Profile;
