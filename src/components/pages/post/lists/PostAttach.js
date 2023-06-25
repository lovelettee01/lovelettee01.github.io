import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Flex from 'components/common/Flex';

const PostAttach = ({ id, likeCount, replyCount, viewCount }) => {
  return (
    <Row className="flex-1 d-flex align-items-end fw-semi-bold fs--1">
      <Col xs="auto">
        <Flex
          alignItems="center"
          className="rounded text-700 me-3 cursor-pointer"
        >
          {/*<img src={likeActive} alt="" width="20" />*/}
          <FontAwesomeIcon icon="fa-heart" />
          <span className="ms-1">{likeCount?.toLocaleString()}</span>
        </Flex>
      </Col>
      <Col xs="auto">
        <Flex
          alignItems="center"
          className="rounded text-700 me-3 cursor-pointer"
        >
          <FontAwesomeIcon icon="fa-comments" />
          <span className="ms-1">{replyCount?.toLocaleString()}</span>
        </Flex>
      </Col>
      <Col xs="auto">
        <Flex
          alignItems="center"
          className="rounded text-700 me-3 cursor-pointer"
        >
          <FontAwesomeIcon icon="fa-eye" />
          <span className="ms-1">{viewCount?.toLocaleString()}</span>
        </Flex>
      </Col>
      <Col xs="auto">
        <Flex
          alignItems="center"
          className="rounded text-700 me-3 cursor-pointer"
        >
          <FontAwesomeIcon icon="fa-share-alt" />
          <span className="ms-1">share</span>
        </Flex>
      </Col>
    </Row>
  );
};

PostAttach.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  viewCount: PropTypes.number,
  likeCount: PropTypes.number,
  replyCount: PropTypes.number
};

export default PostAttach;
