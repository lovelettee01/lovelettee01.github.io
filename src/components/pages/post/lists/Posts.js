import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Offcanvas,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import usePosts from 'hooks/usePosts';
import usePagination from 'hooks/usePagination';
import { useBreakpoints } from 'hooks/useBreakpoints';

import Flex from 'components/common/Flex';
import Loading from 'components/common/Loading';

import PostFilters from './PostFilters';
import PostHeader from './PostHeader';
import PostList from './PostList';
import PostGrid from './PostGrid';

import { SET_CONFIG } from 'store/slices/Config';

const Posts = () => {
  const navigate = useNavigate();
  const { postLayout } = useParams();
  const layout = postLayout;
  const isList = layout === 'list';
  const isGrid = layout === 'grid';

  useEffect(() => {
    isList || isGrid || navigate('/errors/404');
  }, []);

  const [showFilterCanvas, setShowFilterCanvas] = useState(false);
  const [postPerPage, setPostPerPage] = useState(6);
  const { breakpoints } = useBreakpoints();
  const { loading, handleSearch } = usePosts();
  const dispatch = useDispatch();

  //게시물 조회
  useEffect(() => {
    handleSearch();
  }, []);

  const { data } = useSelector(s => s.post.posts);
  const { isNavbarVerticalCollapsed } = useSelector(state => state.config);
  const postsNavbarVerticalCollapsed = useRef(isNavbarVerticalCollapsed);

  console.log(`Post Data : ${loading} `, data);
  const {
    paginationState: {
      data: paginatedPosts,
      totalItems,
      itemsPerPage,
      currentPage,
      canNextPage,
      canPreviousPage,
      paginationArray
    },
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage
  } = usePagination(data, postPerPage);

  useEffect(() => {
    dispatch(SET_CONFIG({ key: 'isNavbarVerticalCollapsed', value: true }));

    return () => {
      dispatch(
        SET_CONFIG({
          key: 'isNavbarVerticalCollapsed',
          value: postsNavbarVerticalCollapsed.current
        })
      );
    };
  }, []);

  return (
    <>
      <Row className="g-3">
        {breakpoints.up('xl') && (
          <Col xl={3}>
            <PostFilters />
          </Col>
        )}
        <Col xl={9}>
          {/* Posts Header */}
          <PostHeader
            layout={layout}
            setShowFilterCanvas={setShowFilterCanvas}
          />
          {/* Posts */}
          {loading ? (
            <Loading />
          ) : (
            <>
              <Row className="mb-3 g-3">
                {paginatedPosts.length > 0 ? (
                  paginatedPosts.map(post =>
                    layout === 'list' ? (
                      <Col key={post.id} xs={12}>
                        <PostList post={post} />
                      </Col>
                    ) : (
                      <Col key={post.id} md={6} xxl={4}>
                        <PostGrid post={post} />
                      </Col>
                    )
                  )
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
                      <Col xs="auto" as={Flex} alignItems="center">
                        <small className="d-none d-lg-block me-2">Show:</small>
                        <Form.Select
                          size="sm"
                          value={itemsPerPage}
                          onChange={({ target }) => {
                            setItemsPerPage(target.value);
                            setPostPerPage(target.value);
                          }}
                          style={{ maxWidth: '4.875rem' }}
                        >
                          <option value={2}>2</option>
                          <option value={4}>4</option>
                          <option value={6}>6</option>
                          <option value={totalItems}>All</option>
                        </Form.Select>
                      </Col>
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
      {breakpoints.down('xl') && (
        <Offcanvas
          show={showFilterCanvas}
          onHide={() => setShowFilterCanvas(false)}
          placement="start"
          className="offcanvas offcanvas-filter-sidebar"
        >
          <PostFilters isCanvas={true} setShow={setShowFilterCanvas} />
        </Offcanvas>
      )}
    </>
  );
};

export default Posts;
