import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import PostDetailsMedia from './PostDetailsMedia';
import PostDetailsMain from './PostDetailsMain';
import PostDetailsFooter from './PostDetailsFooter';
import Flex from 'components/common/Flex';

const PostDetails = () => {
  const { postId } = useParams();

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          {/*<Row>*/}
          {/*  <Col lg={6} className="mb-4 mb-lg-0">*/}
          {/*    <PostDetailsMedia post={post} />*/}
          {/*  </Col>*/}
          {/*  <Col lg={6} as={Flex} justifyContent="between" direction="column">*/}
          {/*    <PostDetailsMain post={post} postsDispatch={postsDispatch} />*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col xs={12}>*/}
          {/*    <PostDetailsFooter post={post} postsDispatch={postsDispatch} />*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          <Row>
            <Col xs={12}>
              준비중입니다!! 최대한 빨리 보실수 있도록 작업해 놓겠습니다 ㅠㅠ
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default PostDetails;
