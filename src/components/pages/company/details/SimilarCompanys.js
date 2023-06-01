import React from 'react';
import { Card } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import FalconLink from 'components/common/FalconLink';
import { companyData } from 'data/elearning/companyData';
import Slider from 'react-slick';
import CompanyGrid from '../CompanyGrid';

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1540,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const SimilarCompanys = () => {
  return (
    <Card className="mb-3">
      <FalconCardHeader title="Similar Companys" titleTag="h6" />
      <Card.Body className="bg-light py-0">
        <Slider
          {...sliderSettings}
          className="full-height-slider slick-slider-arrow-inner"
        >
          {companyData.map(company => (
            <CompanyGrid company={company} key={company.id} />
          ))}
        </Slider>
      </Card.Body>
      <Card.Footer className="text-end py-2">
        <FalconLink
          title="All companys"
          to="/e-learning/company/company-grid"
          icon="external-link-alt"
          className="fw-medium"
        />
      </Card.Footer>
    </Card>
  );
};

export default SimilarCompanys;
