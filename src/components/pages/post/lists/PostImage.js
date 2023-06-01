import React from 'react';
import { Badge, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import classNames from 'classnames';

const sliderSettings = {
  autoplay: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const PostSingleImage = ({ id, image, name, layout }) => {
  return (
    <Link
      to={`/post/details/${id}`}
      className="d-block h-sm-100"
      key={image.id}
    >
      <Image
        rounded={layout === 'list'}
        src={image.src}
        className={classNames('h-100 w-100 fit-cover', {
          'rounded-top': layout === 'grid'
        })}
        alt={name}
      />
    </Link>
  );
};

const PostImage = ({ name, id, isNew, files, layout }) => {
  return (
    <div
      className={classNames('position-relative rounded-top overflow-hidden', {
        'h-sm-100': layout === 'list'
      })}
    >
      {files.length === 1 && (
        <PostSingleImage id={id} image={files[0]} name={name} layout={layout} />
      )}
      {files.length > 1 && (
        <Slider
          {...sliderSettings}
          className="post-image-slider slick-slider-arrow-inner h-100 full-height-slider"
        >
          {files.map(image => (
            <PostSingleImage
              key={image.id}
              id={id}
              image={image}
              name={name}
              layout={layout}
            />
          ))}
        </Slider>
      )}
      {isNew && (
        <Badge
          pill
          bg="success"
          className="position-absolute top-0 end-0 me-2 mt-2 fs--2 z-index-2"
        >
          New
        </Badge>
      )}
    </div>
  );
};

PostSingleImage.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    src: PropTypes.string.isRequired
  }),
  name: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired
};

PostImage.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isNew: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  layout: PropTypes.string.isRequired
};

export default PostImage;
