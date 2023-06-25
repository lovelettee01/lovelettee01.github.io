import React, { useCallback, useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import usePagination from 'hooks/usePagination';
import Flex from 'components/common/Flex';
import Loading from 'components/common/Loading';
import PostList from 'components/pages/post/lists/PostList';

import { postListSelf } from 'store/slices/Post';

const MyPosts = () => {
  const dispatch = useDispatch();
  const getMyList = useCallback(() => {
    dispatch(postListSelf());
  }, [dispatch]);

  useEffect(() => {
    getMyList();
  }, [dispatch]);

  const loading = useSelector(state => state.post.isLoading);
  const { data } = useSelector(s => s.post.posts);
  const {
    paginationState: {
      data: paginatedPosts,
      currentPage,
      canNextPage,
      canPreviousPage,
      paginationArray
    },
    nextPage,
    prevPage,
    goToPage
  } = usePagination(data, 3);
  return (
    <>
      <Row className="g-3">
        <Col xl={9}>
          {/* Posts */}
          {loading ? (
            <Loading />
          ) : (
            <>
              <Row className="mb-3 g-3">
                {paginatedPosts.length > 0 ? (
                  paginatedPosts.map(post => (
                    <Col key={post.id} xs={12}>
                      <PostList post={post} />
                    </Col>
                  ))
                ) : (
                  <Card className="bg-transparent shadow-none">
                    <Card.Body className="border-2 border-dashed border-400 border rounded text-center py-5">
                      <div className="fs--1">
                        <FontAwesomeIcon
                          icon="exclamation-triangle"
                          className="fs-6 mb-3"
                        />
                        <h5>No Posts Found!</h5>
                        <p className="mb-0">
                          Your search did not match any Posts. Please try again.
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Row>
              {/* Post pagination */}
              {paginatedPosts.length > 0 && (
                <Card>
                  <Card.Body>
                    <Row className="g-3 flex-center justify-content-sm-between">
                      {/*<Col xs="auto" as={Flex} alignItems="center">*/}
                      {/*  <small className="d-none d-lg-block me-2">Show:</small>*/}
                      {/*  <Form.Select*/}
                      {/*    size="sm"*/}
                      {/*    value={itemsPerPage}*/}
                      {/*    onChange={({ target }) => {*/}
                      {/*      setItemsPerPage(target.value);*/}
                      {/*      setPostPerPage(target.value);*/}
                      {/*    }}*/}
                      {/*    style={{ maxWidth: '4.875rem' }}*/}
                      {/*  >*/}
                      {/*    <option value={2}>2</option>*/}
                      {/*    <option value={4}>4</option>*/}
                      {/*    <option value={6}>6</option>*/}
                      {/*    <option value={totalItems}>All</option>*/}
                      {/*  </Form.Select>*/}
                      {/*</Col>*/}
                      <Col xs="auto" as={Flex}>
                        <div>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip style={{ position: 'fixed' }}>
                                Prev
                              </Tooltip>
                            }
                          >
                            <Button
                              variant="falcon-default"
                              size="sm"
                              disabled={!canPreviousPage}
                              onClick={prevPage}
                              className="me-2"
                              trigger="focus"
                            >
                              <FontAwesomeIcon icon="chevron-left" />
                            </Button>
                          </OverlayTrigger>
                        </div>

                        <ul className="pagination mb-0">
                          {paginationArray.map(page => (
                            <li
                              key={page}
                              className={classNames({
                                active: currentPage === page
                              })}
                            >
                              <Button
                                size="sm"
                                variant="falcon-default"
                                className="page me-2"
                                onClick={() => goToPage(page)}
                              >
                                {page}
                              </Button>
                            </li>
                          ))}
                        </ul>
                        <div>
                          <OverlayTrigger
                            trigger="click"
                            placement="top"
                            overlay={
                              <Tooltip
                                style={{ position: 'fixed' }}
                                id="button-tooltip-2"
                              >
                                Next
                              </Tooltip>
                            }
                          >
                            <Button
                              variant="falcon-default"
                              size="sm"
                              disabled={!canNextPage}
                              onClick={nextPage}
                              trigger="focus"
                            >
                              <FontAwesomeIcon icon="chevron-right" />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default MyPosts;
