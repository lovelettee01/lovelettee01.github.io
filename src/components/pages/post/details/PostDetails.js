import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import PostDetailsMedia from './PostDetailsMedia';
import PostDetailsMain from './PostDetailsMain';
import PostDetailsFooter from './PostDetailsFooter';
import { PostContext } from 'context/Context';
import Flex from 'components/common/Flex';

const PostDetails = () => {
  const { postId } = useParams();

  const {
    postsState: { posts },
    postsDispatch
  } = useContext(PostContext);

  const post = posts.find(post => post.id === postId);

  return post ? (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col lg={6} className="mb-4 mb-lg-0">
              <PostDetailsMedia post={post} />
            </Col>
            <Col lg={6} as={Flex} justifyContent="between" direction="column">
              <PostDetailsMain post={post} postsDispatch={postsDispatch} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PostDetailsFooter post={post} postsDispatch={postsDispatch} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  ) : (
    <Navigate to={`/e-commerce/post/post-details/${posts[0].id}`} />
  );
};

export default PostDetails;
