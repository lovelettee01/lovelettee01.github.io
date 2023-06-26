import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Flex from 'components/common/Flex';
import Hoverbox from 'components/common/Hoverbox';
import ModalVideoContent from '../ModalVideoContent';
import playIcon from 'assets/img/icons/play.svg';

import PostTags from './PostTags';
import PostWriter from './PostWriter';
import PostAttach from './PostAttach';

const PostList = ({ post }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    id,
    writer,
    title,
    textContent,
    postType,
    // community,
    mediaContents,
    //attachedFiles,
    //enableComment,
    viewCount,
    likeCount,
    replyCount,
    //liked,
    activeStatus,
    //vote,
    isAnnouncement,
    isPublic,
    //isViewed,
    //isVoted,
    votedMemberCount,
    votedShareCount,
    votedShareRatio,
    // updatedAt,
    createdAt
  } = post;

  const isInFavouriteItems = id => {
    if (id === null) return;
  };
  const isInCart = id => {
    if (id === null) return;
  };
  const handleFavouriteClick = () => {};
  const handleAddToCart = () => {};

  return (
    <>
      {mediaContents[0] && (
        <ModalVideoContent
          show={showModal}
          setShow={setShowModal}
          attachment={{
            image: mediaContents[0].thumbnailUrl,
            src: mediaContents[0].url
          }}
        />
      )}
      <Card className="overflow-hidden">
        <Card.Body className="p-0">
          <Row className="g-0">
            {mediaContents[0] && (
              <Col md={4} lg={3}>
                <Hoverbox
                  onClick={() => setShowModal(true)}
                  className="h-md-100"
                >
                  <Button
                    variant="link"
                    onClick={() => setShowModal(true)}
                    className="p-0 border-0 h-100"
                  >
                    <Image
                      src={mediaContents[0].thumbnailUrl}
                      alt=""
                      className="w-100 h-100 fit-cover"
                    />
                  </Button>
                  <Hoverbox.Content className="flex-center pe-none bg-holder overlay overlay-2">
                    <Image
                      src={playIcon}
                      width={60}
                      alt=""
                      className="z-index-1"
                    />
                  </Hoverbox.Content>
                </Hoverbox>
              </Col>
            )}
            <Col
              md={mediaContents[0] ? 8 : 12}
              lg={mediaContents[0] ? 9 : 12}
              className="p-x1"
            >
              <Row className="g-0 h-100">
                <Col lg={8} as={Flex} className="flex-column pe-x1">
                  {/* Tags 리스트   */}
                  <PostTags
                    postType={postType}
                    activeStatus={activeStatus}
                    isAnnouncement={isAnnouncement}
                    isPublic={isPublic}
                  />
                  {/* 작성자 정보 */}
                  <PostWriter writer={writer} createdAt={createdAt} />

                  <h4 className="mt-3 mb-3 mt-md-2 mt-md-0 fs-0 fs-lg-1">
                    <Link to={`/post/details/${id}`} className="text-900">
                      {title}
                    </Link>
                  </h4>
                  <p className="fs--1 mt-2 d-none d-lg-block">
                    {textContent.substring(0, 142)}...
                  </p>

                  {/* 좋아요, 코멘트, 공유 */}
                  <PostAttach
                    id={id}
                    viewCount={viewCount}
                    likeCount={likeCount}
                    replyCount={replyCount}
                  />
                </Col>
                <Col lg={4} className="mt-4 mt-lg-0">
                  <Flex
                    justifyContent="between"
                    className="h-100 rounded border-lg border-1 flex-lg-column p-lg-3"
                  >
                    <div className="mb-lg-4 mt-auto mt-lg-0">
                      <h4 className="fs-1 text-warning d-flex align-items-center">
                        지분율 :&nbsp;<span>{votedShareRatio || '0'}</span>
                        {votedShareCount && (
                          <span className="ms-2 fs--1 text-700">
                            (참여주식 :{' '}
                            {votedShareCount
                              ? votedShareCount?.toLocaleString()
                              : 0}
                            주)
                          </span>
                        )}
                      </h4>
                      <p className="mb-0 fs--1 text-800">
                        {votedMemberCount
                          ? votedMemberCount?.toLocaleString()
                          : 0}{' '}
                        참여중
                      </p>
                    </div>
                    <Flex className="mt-3 flex-lg-column gap-2 d-none">
                      <Button
                        size="md"
                        variant="falcon-default"
                        className="fs--1 text-600 white-space-nowrap w-100"
                        onClick={handleFavouriteClick}
                      >
                        <FontAwesomeIcon
                          icon={
                            isInFavouriteItems(id) ? 'heart' : ['far', 'heart']
                          }
                          className={classNames('', {
                            'text-danger': isInFavouriteItems(id)
                          })}
                        />
                        <span className="ms-1 d-none d-lg-inline">
                          {isInFavouriteItems(id) ? '관심게시물' : '관심등록'}
                        </span>
                      </Button>
                      <Button
                        size="md"
                        variant="primary"
                        className="fs--1"
                        onClick={handleAddToCart}
                      >
                        <FontAwesomeIcon
                          icon={`${
                            isInCart(id) ? 'shopping-cart' : 'cart-plus'
                          }`}
                        />
                        <span className="ms-1 d-none d-lg-inline">
                          {isInCart(id) ? '참여완료' : '참여하기'}
                        </span>
                      </Button>
                    </Flex>
                  </Flex>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

PostList.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    writer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickName: PropTypes.string.isRequired,
      profileImageUrl: PropTypes.string
    }).isRequired,
    title: PropTypes.string.isRequired,
    textContent: PropTypes.string.isRequired,
    postType: PropTypes.oneOf(['normal', 'petition', 'opinion_poll'])
      .isRequired,
    community: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      shareRatio: PropTypes.number,
      shareCount: PropTypes.number,
      totalShareCount: PropTypes.number
    }),
    mediaContents: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        postId: PropTypes.number,
        writerId: PropTypes.number,
        url: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired
      })
    ),
    attachedFiles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        originFilename: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired
      })
    ),
    enableComment: PropTypes.bool,
    viewCount: PropTypes.number.isRequired,
    likeCount: PropTypes.number.isRequired,
    replyCount: PropTypes.number,
    liked: PropTypes.bool,
    activeStatus: PropTypes.oneOf(['active', 'inactive']),
    vote: PropTypes.shape({
      id: PropTypes.number.isRequired,
      beginDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      voteItems: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          content: PropTypes.string.isRequired,
          votedCount: PropTypes.number,
          votedShareCount: PropTypes.number,
          votedShareRatio: PropTypes.number,
          isVoted: PropTypes.bool,
          createdAt: PropTypes.string.isRequired,
          updatedAt: PropTypes.string.isRequired
        })
      ),
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired
    }),
    isAnnouncement: PropTypes.bool,
    isPublic: PropTypes.bool,
    isViewed: PropTypes.bool,
    isVoted: PropTypes.bool,
    votedMemberCount: PropTypes.number,
    votedShareCount: PropTypes.number,
    votedShareRatio: PropTypes.number,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  })
};

export default PostList;
