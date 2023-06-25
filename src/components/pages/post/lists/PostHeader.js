import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Background from 'components/common/Background';
import corner6 from 'assets/img/illustrations/corner-6.png';
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import usePosts from 'hooks/usePosts';
import Flex from 'components/common/Flex';

const PostHeader = ({ layout, setShowFilterCanvas }) => {
  const { handleSearch, handleIsAscClick, handleSortByChange, isAsc } =
    usePosts();

  const [searchText, setSearchText] = useState('');

  const handleOnSubmit = e => {
    e.preventDefault();
    handleSearch(searchText);
  };
  return (
    <Card className="mb-3">
      <Card.Header className="position-relative">
        <h5 className="mb-0 mt-1">주주여론 리스트</h5>
        <Background image={corner6} className="d-none d-md-block bg-card" />
      </Card.Header>
      <Card.Body className="pt-0 pt-md-3">
        <Row className="g-3 align-items-center">
          <Col xs="auto" className="d-xl-none">
            <Button
              onClick={() => setShowFilterCanvas(true)}
              className="position-relative p-0"
              size="sm"
              variant="link"
            >
              <FontAwesomeIcon icon="filter" className="fs-0 text-700" />
            </Button>
          </Col>
          <Col>
            <Form className="position-relative" onSubmit={handleOnSubmit}>
              <Flex className="gap-2 flex-xl-grow-1 align-items-center justify-content-xl-between">
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  size="sm"
                  aria-label="Search"
                  className="rounded search-input ps-4 d-flex"
                  onChange={({ target }) => {
                    setSearchText(target.value);
                  }}
                />
                <FontAwesomeIcon
                  icon="search"
                  className="fs--1 text-400 position-absolute text-400 start-0 top-50 translate-middle-y ms-2"
                />
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip style={{ position: 'fixed' }}>Search</Tooltip>
                  }
                >
                  <span onClick={handleOnSubmit}>
                    <FontAwesomeIcon
                      icon="search"
                      className="fs-1 hover-700 text-400 top-50 ms-2"
                    />
                  </span>
                </OverlayTrigger>
              </Flex>
            </Form>
          </Col>
          <Col xs="auto" className="col-md">
            <Row className="g-0 justify-content-end">
              <Col
                xs="auto"
                className="position-md-static position-absolute top-0 end-0 me-3 mt-3 mt-md-0"
              >
                <Form as={Row} className="gx-2">
                  <Col xs="auto" className="d-none d-lg-block">
                    <small>Sort by:</small>
                  </Col>
                  <Col xs="auto">
                    <InputGroup size="sm">
                      <Form.Select
                        className="pe-5"
                        defaultValue="price"
                        style={{ maxWidth: '6.7rem' }}
                        onChange={({ target }) =>
                          handleSortByChange(target.value)
                        }
                      >
                        <option value="updatedAt">작성일</option>
                        <option value="replyCount">댓글</option>
                        <option value="likeCount">좋아요</option>
                      </Form.Select>
                      <InputGroup.Text
                        as={Button}
                        variant="link"
                        className="border border-300 text-700"
                        onClick={() => handleIsAscClick(!isAsc)}
                      >
                        <FontAwesomeIcon
                          icon={isAsc ? 'sort-amount-up' : 'sort-amount-down'}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Form>
              </Col>
              <Col xs="auto" className="p-0">
                <Row className="g-2 align-items-center">
                  <Col xs="auto" className="d-none d-lg-block">
                    <small>View:</small>
                  </Col>
                  <Col xs="auto mb-1 mb-md-0">
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip style={{ position: 'fixed' }}>
                          Company Grid
                        </Tooltip>
                      }
                    >
                      <Link
                        to="/post/grid"
                        className={`me-3 ${
                          layout === 'grid' ? 'text-700' : 'text-400 hover-700'
                        }`}
                      >
                        <FontAwesomeIcon
                          icon="th"
                          transform="down-3"
                          className="fs-1"
                        />
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip style={{ position: 'fixed' }}>
                          Company List
                        </Tooltip>
                      }
                    >
                      <Link
                        to="/post/list"
                        className={`me-2 ${
                          layout === 'list' ? 'text-700' : 'text-400 hover-700'
                        }`}
                      >
                        <FontAwesomeIcon
                          icon="list-ul"
                          transform="down-3"
                          className="fs-1 hover-700"
                        />
                      </Link>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

PostHeader.propTypes = {
  layout: PropTypes.string,
  isAsc: PropTypes.bool,
  setIsAsc: PropTypes.func,
  setSortBy: PropTypes.func,
  setShowFilterCanvas: PropTypes.func,
  searchedText: PropTypes.string,
  handleSearch: PropTypes.func
};

export default PostHeader;
