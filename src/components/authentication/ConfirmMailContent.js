import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import envelope from 'assets/img/icons/spot-illustrations/16.png';
import WizardModal from '../common/WizardModal';

const ConfirmMailContent = ({ titleTag: TitleTag }) => {
  const [modal, showModal] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  useEffect(() => {
    if (!email) showModal(true);
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <WizardModal
        modal={modal}
        showModal={showModal}
        message={'잘못된 경로로 접근하였습니다.'}
        optionProps={{
          ok: {
            handleClick: () => {
              navigate('/');
            }
          }
        }}
      />
      <img
        className="d-block mx-auto mb-4"
        src={envelope}
        alt="sent"
        width={100}
      />
      <TitleTag>Please check your email!</TitleTag>
      <p>
        An email has been sent to{' '}
        <strong className="text-danger">{email}</strong>. Please click on the
        included link to reset your password.
      </p>
      <Button
        as={Link}
        color="primary"
        size="sm"
        className="mt-3"
        to={`/signin`}
      >
        <FontAwesomeIcon
          icon="chevron-left"
          transform="shrink-4 down-1"
          className="me-1"
        />
        Return to login
      </Button>
    </>
  );
};

ConfirmMailContent.propTypes = {
  titleTag: PropTypes.string
};

ConfirmMailContent.defaultProps = { titleTag: 'h4' };

export default ConfirmMailContent;
