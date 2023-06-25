import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Col,
  Image,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap';
import Flex from 'components/common/Flex';
import playIcon from 'assets/img/icons/play.svg';
import Hoverbox from 'components/common/Hoverbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalVideoContent from '../ModalVideoContent';
import PostWriter from './PostWriter';
import { Link } from 'react-router-dom';
import PostTags from './PostTags';
import PostAttach from './PostAttach';

const PostGrid = ({ post }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    id,
    writer,
    title,
    textContent,
    postType,
    community,
    mediaContents,
    attachedFiles,
    enableComment,
    viewCount,
    likeCount,
    replyCount,
    liked,
    activeStatus,
    vote,
    isAnnouncement,
    isPublic,
    isViewed,
    isVoted,
    votedMemberCount,
    votedShareCount,
    votedShareRatio,
    createdAt,
    updatedAt
  } = post;

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
      <Card className="h-100 overflow-hidden">
        <Card.Body
          as={Flex}
          direction="column"
          justifyContent="between"
          className="p-0"
        >
          <div>
            {mediaContents[0] && (
              <Col md={4} lg={3}>
                <Hoverbox
                  onClick={() => setShowModal(true)}
                  className="h-md-100"
                >
                  <Button
                    variant="link"
                    onClick={() => setShowModal(true)}
                    className="p-0 border-0"
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
            <div className="p-3">
              {/* Tags 리스트   */}
              <PostTags
                postType={postType}
                activeStatus={activeStatus}
                isAnnouncement={isAnnouncement}
                isPublic={isPublic}
              />

              <h4 className="mt-3 mb-3 mt-md-2 mt-md-0 fs-0 fs-lg-1">
                <Link to={`/post/details/${id}`} className="text-900">
                  {title}
                </Link>
              </h4>

              {/* 작성자 정보 */}
              <PostWriter writer={writer} createdAt={createdAt} />
            </div>
          </div>
          <Row className="g-0 mb-3 align-items-end">
            <Col className="ps-3">
              <h4 className="fs-1 text-warning d-flex align-items-center">
                지분율 <span>{votedShareRatio}</span>
                {votedMemberCount && (
                  <span className="ms-2 fs--1 text-700">
                    참여자 : {votedMemberCount}명
                  </span>
                )}
              </h4>
              <p className="mb-0 fs--1 text-800">
                {votedShareCount?.toLocaleString()} 참여중
              </p>
            </Col>
            <Col xs="auto" className="pe-3">
              {/*<OverlayTrigger*/}
              {/*  placement="top"*/}
              {/*  overlay={*/}
              {/*    <Tooltip style={{ position: 'fixed' }}>*/}
              {/*      {isInFavouriteItems(id)*/}
              {/*        ? 'Remove from Wishlist'*/}
              {/*        : 'Add to Wishlist'}*/}
              {/*    </Tooltip>*/}
              {/*  }*/}
              {/*>*/}
              {/*  <Button*/}
              {/*    variant="falcon-default"*/}
              {/*    size="sm"*/}
              {/*    onClick={handleFavouriteClick}*/}
              {/*    className="me-2 hover-danger"*/}
              {/*  >*/}
              {/*    <FontAwesomeIcon*/}
              {/*      icon={isInFavouriteItems(id) ? 'heart' : ['far', 'heart']}*/}
              {/*      className={`${isInFavouriteItems(id) && 'text-danger'}`}*/}
              {/*      transform="down-1"*/}
              {/*    />*/}
              {/*  </Button>*/}
              {/*</OverlayTrigger>*/}
              {/*<OverlayTrigger*/}
              {/*  placement="top"*/}
              {/*  overlay={*/}
              {/*    <Tooltip style={{ position: 'fixed' }}>*/}
              {/*      {isInCart(id) ? 'Remove from Cart' : 'Add to Cart'}*/}
              {/*    </Tooltip>*/}
              {/*  }*/}
              {/*>*/}
              {/*  <Button*/}
              {/*    variant={`${isInCart(id) ? 'primary' : 'falcon-default'}`}*/}
              {/*    size="sm"*/}
              {/*    onClick={handleAddToCart}*/}
              {/*  >*/}
              {/*    <FontAwesomeIcon*/}
              {/*      icon={isInCart(id) ? 'shopping-cart' : 'cart-plus'}*/}
              {/*    />*/}
              {/*  </Button>*/}
              {/*</OverlayTrigger>*/}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

PostGrid.propTypes = {
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
    voteMemberCount: PropTypes.number,
    votedShardCount: PropTypes.number,
    votedShareRatio: PropTypes.number,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  })
};

export default PostGrid;
