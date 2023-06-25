import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateTimeFormat } from '../../../../helpers/utils';

const PostWriter = ({ writer, createdAt }) => {
  return (
    <Row className="justify-content-between">
      <Col>
        <Flex>
          {writer?.profileImageUrl ? (
            <Avatar size="2xl" className="mt-1" src={writer?.profileImageUrl} />
          ) : (
            <FontAwesomeIcon
              icon="user-circle"
              className="mt-1 text-700"
              style={{ height: '29px', width: '29px' }}
            />
          )}
          <div className="flex-1 align-self-center ms-2">
            <p className="mb-1 lh-1">
              <span className="fw-semi-bold">{writer.nickName}</span>
            </p>
            <p className="mb-0 fs--1">{dateTimeFormat(createdAt)}</p>
          </div>
        </Flex>
      </Col>
    </Row>
  );
};

PostWriter.propTypes = {
  writer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickName: PropTypes.string.isRequired,
    profileImageUrl: PropTypes.string
  }).isRequired,
  createdAt: PropTypes.string.isRequired
};

export default PostWriter;
