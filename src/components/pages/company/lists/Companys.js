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
import classNames from 'classnames';
import usePagination from 'hooks/usePagination';
import CompanyGrid from './CompanyGrid';
import CompanyList from './CompanyList';
import CompanyHeader from './CompanyHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import CompanyFilters from './CompanyFilters';
import { useBreakpoints } from 'hooks/useBreakpoints';

import { useSelector, useDispatch } from 'react-redux';
import { SET_CONFIG } from 'store/slices/Config';

const Companys = () => {
  const [showFilterOffcanvas, setShowFilterOffcanvas] = useState(false);
  const [companyPerPage, setCompanyPerPage] = useState(6);
  const navigate = useNavigate();
  const { breakpoints } = useBreakpoints();
  const { companyLayout } = useParams();
  const {
    company: { companys }
  } = useSelector(s => s);

  const {
    config: { isNavbarVerticalCollapsed }
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const companysNavbarVerticalCollapsed = useRef(isNavbarVerticalCollapsed);

  const {
    paginationState: {
      data: paginatedCompanys,
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
  } = usePagination(companys, companyPerPage);

  const layout = companyLayout;
  const isList = layout === 'list';
  const isGrid = layout === 'grid';

  useEffect(() => {
    isList || isGrid || navigate('/errors/404');
  }, []);

  useEffect(() => {
    dispatch(SET_CONFIG({ key: 'isNavbarVerticalCollapsed', value: true }));

    return () => {
      dispatch(
        SET_CONFIG({
          key: 'isNavbarVerticalCollapsed',
          value: companysNavbarVerticalCollapsed.current
        })
      );
    };
  }, []);

  return (
    <>
      <Row className="g-3">
        {breakpoints.up('xl') && (
          <Col xl={3}>
            <CompanyFilters />
          </Col>
        )}
        <Col xl={9}>
          {/* Companys Header */}
          <CompanyHeader
            layout={layout}
            setShowFilterOffcanvas={setShowFilterOffcanvas}
          />
          {/* Companys */}
          <Row className="mb-3 g-3">
            {paginatedCompanys.length > 0 ? (
              paginatedCompanys.map(company =>
                layout === 'list' ? (
                  <Col key={company.id} xs={12}>
                    <CompanyList company={company} />
                  </Col>
                ) : (
                  <Col key={company.id} md={6} xxl={4}>
                    <CompanyGrid company={company} />
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
                    <h5>No Companys Found!</h5>
                    <p className="mb-0">
                      Your search did not match any Companys. Please try again.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Row>
          {/* Company pagination */}
          {paginatedCompanys.length > 0 && (
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
                        setCompanyPerPage(target.value);
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
                          <Tooltip style={{ position: 'fixed' }}>Prev</Tooltip>
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
        </Col>
      </Row>
      {breakpoints.down('xl') && (
        <Offcanvas
          show={showFilterOffcanvas}
          onHide={() => setShowFilterOffcanvas(false)}
          placement="start"
          className="offcanvas offcanvas-filter-sidebar"
        >
          <CompanyFilters isOffcanvas={true} setShow={setShowFilterOffcanvas} />
        </Offcanvas>
      )}
    </>
  );
};

export default Companys;
