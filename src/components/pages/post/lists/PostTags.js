import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import SoftBadge from 'components/common/SoftBadge';

import { postTagList } from 'data/postData';

const PostTags = ({ postType, activeStatus, isAnnouncement, isPublic }) => {
  const postTags = [];
  if (postType) postTags.push(postTagList[postType]);
  if (activeStatus) postTags.push(postTagList[activeStatus]);
  if (isAnnouncement) postTags.push(postTagList.announcement);
  if (isPublic) postTags.push(postTagList.public);

  return (
    <Flex wrap="wrap" className="gap-2 mb-3">
      {postTags.map(tag => (
        <SoftBadge key={tag.id} pill bg={tag.type}>
          <FontAwesomeIcon
            icon={tag.icon}
            className="me-1"
            transform="shrink-4"
          />
          {tag.content}
        </SoftBadge>
      ))}
    </Flex>
  );
};

PostTags.propTypes = {
  postType: PropTypes.oneOf(['normal', 'petition', 'opinion_poll']).isRequired,
  activeStatus: PropTypes.oneOf(['active', 'inactive']),
  isAnnouncement: PropTypes.bool,
  isPublic: PropTypes.bool
};

export default PostTags;
