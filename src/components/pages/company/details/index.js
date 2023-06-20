import React, { useEffect, useRef } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import waveBg from 'assets/img/illustrations/bg-wave.png';
import {
  companyContents,
  companyFeatures,
  companyLessons,
  companyRequirements,
  companyReviews
} from 'data/elearning/companyDetails';
import CompanyBanner from './CompanyBanner';
import CompanyPricingPlan from './CompanyPricingPlan';
import CompanyFeatures from './CompanyFeatures';
import CompanyContents from './CompanyContents';
import CompanyRequirements from './CompanyRequirements';
import CompanyTrainer from './CompanyTrainer';
import CompanyReviews from './CompanyReviews';
import CompanyLessonPlan from './CompanyLessonPlan';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CONFIG } from 'store/slices/Config';

const Companydetails = () => {
  const { navbarPosition } = useSelector(state => state.config);
  const { companys } = useSelector(state => state.company);
  const dispatch = useDispatch();

  const { companyId } = useParams();
  const prevNavbarPosition = useRef(navbarPosition);

  const company = companys.find(company => company.id === companyId);

  useEffect(() => {
    if (navbarPosition !== 'double-top')
      dispatch(SET_CONFIG({ key: 'navbarPosition', value: 'top' }));
    dispatch(
      SET_CONFIG({
        key: 'disabledNavbarPosition',
        value: ['vertical', 'combo']
      })
    );
  }, [navbarPosition]);

  useEffect(() => {
    return () => {
      dispatch(
        SET_CONFIG({
          key: 'disabledNavbarPosition',
          value: []
        })
      );
      dispatch(
        SET_CONFIG({ key: 'navbarPosition', value: prevNavbarPosition.current })
      );
    };
  }, []);

  return company ? (
    <>
      <CompanyBanner company={company} />
      <Row className="g-lg-3">
        <Col lg={8} className="order-1 order-lg-0">
          <CompanyFeatures data={companyFeatures} />
          <CompanyContents data={companyContents} />
          <CompanyLessonPlan data={companyLessons} />
          <CompanyRequirements data={companyRequirements} />
          <CompanyTrainer />
          <CompanyReviews data={companyReviews} />
          {/* <SimilarCompanys /> */}
        </Col>
        <Col lg={4}>
          <div className="company-details-sticky-sidebar mb-lg-8 mt-xl-n10 pe-xl-4 pe-xxl-7">
            <CompanyPricingPlan company={company} />
            <div className="d-none d-xl-block position-absolute z-index--1 top-0 end-0 text-end me-n2 me-xxl-4 mt-xl-6">
              <Image
                src={waveBg}
                alt=""
                style={{ maxWidth: '23.75rem' }}
                className="bg-card"
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  ) : (
    <Navigate to={`/board/details/${companys[0].id}`} />
  );
};

export default Companydetails;
