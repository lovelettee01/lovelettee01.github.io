import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { SetRegistInfo, signUp } from 'store/slices/Auth';

import { Card, Form, Nav, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Flex from 'components/common/Flex';
import IconButton from 'components/common/IconButton';

import AccountForm from './AccountForm';
import PersonalForm from './PersonalForm';
import Success from './Success';
import WizardModal from 'components/common/WizardModal';

const RegistMain = ({ variant, validation = true, progressBar = true }) => {
  const { isRTL } = useSelector(state => state.config);
  const { step, user } = useSelector(state => state.auth.regist);
  console.log(`step [${step}]`, user, { variant, validation, progressBar });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors
  } = useForm();

  const [modal, setModal] = useState(false);

  const navItems = [
    {
      icon: 'lock',
      label: 'Account'
    },
    {
      icon: 'user',
      label: 'Personal'
    },
    {
      icon: 'thumbs-up',
      label: 'Done'
    }
  ];

  const dispatch = useDispatch();
  const onSubmitData = data => {
    const userData = { ...user, ...data };
    console.log('onSubmitData', userData);

    if (step === 2) {
      dispatch(signUp(userData)).then(res => {
        const resData = res.payload;
        if (!resData.success) {
          toast.error(resData.message, {
            theme: 'colored'
          });
        } else {
          dispatch(SetRegistInfo({ step: step + 1, user: userData }));
        }
      });
    } else {
      dispatch(SetRegistInfo({ step: step + 1, user: userData }));
    }
  };

  const onError = () => {
    if (!validation) {
      clearErrors();
      dispatch(SetRegistInfo({ step: step + 1 }));
    }
  };

  const toggle = () => setModal(!modal);
  const handleNavs = targetStep => {
    if (step !== 3) {
      if (targetStep < step) {
        dispatch(SetRegistInfo({ step: targetStep }));
      } else {
        handleSubmit(onSubmitData, onError)();
      }
    } else {
      toggle();
    }
  };

  return (
    <>
      <WizardModal
        modal={modal}
        setModal={setModal}
        message={
          <>
            회원가입을 완료했습니다.
            <br /> 시작하기를 눌러 컨텐츠를 둘러보세요.
          </>
        }
      />
      <Card
        as={Form}
        noValidate
        onSubmit={handleSubmit(onSubmitData, onError)}
        className="theme-wizard mb-5"
      >
        <Card.Header
          className={classNames('bg-light', {
            'px-4 py-3': variant === 'pills',
            'pb-2': !variant
          })}
        >
          <Nav className="justify-content-center" variant={variant}>
            {variant === 'pills'
              ? navItems.map((item, index) => (
                  <NavItemPill
                    key={item.label}
                    index={index + 1}
                    step={step}
                    handleNavs={handleNavs}
                    icon={item.icon}
                    label={item.label}
                  />
                ))
              : navItems.map((item, index) => (
                  <NavItem
                    key={item.label}
                    index={index + 1}
                    step={step}
                    handleNavs={handleNavs}
                    icon={item.icon}
                    label={item.label}
                  />
                ))}
          </Nav>
        </Card.Header>
        {progressBar && <ProgressBar now={step * 33.3} style={{ height: 2 }} />}
        <Card.Body className="fw-normal px-md-6 py-4">
          {step === 1 && (
            <AccountForm register={register} errors={errors} watch={watch} />
          )}
          {step === 2 && (
            <PersonalForm
              register={register}
              errors={errors}
              setValue={setValue}
            />
          )}
          {step === 3 && <Success />}
        </Card.Body>
        <Card.Footer
          className={classNames('px-md-6 bg-light', {
            'd-none': step === 3,
            ' d-flex': step < 3
          })}
        >
          <IconButton
            variant="link"
            icon={isRTL ? 'chevron-right' : 'chevron-left'}
            iconAlign="left"
            transform="down-1 shrink-4"
            className={classNames('px-0 fw-semi-bold', {
              'd-none': step === 1
            })}
            onClick={() => {
              dispatch(SetRegistInfo({ step: step - 1 }));
            }}
          >
            Prev
          </IconButton>

          <IconButton
            variant="primary"
            className="ms-auto px-5"
            type="submit"
            icon={isRTL ? 'chevron-left' : 'chevron-right'}
            iconAlign="right"
            transform="down-1 shrink-4"
          >
            Next
          </IconButton>
        </Card.Footer>
      </Card>
    </>
  );
};

const NavItem = ({ index, step, handleNavs, icon, label }) => {
  return (
    <Nav.Item>
      <Nav.Link
        className={classNames('fw-semi-bold', {
          done: index < 3 ? step > index : step > 2,
          active: step === index
        })}
        onClick={() => handleNavs(index)}
      >
        <span className="nav-item-circle-parent">
          <span className="nav-item-circle">
            <FontAwesomeIcon icon={icon} />
          </span>
        </span>
        <span className="d-none d-md-block mt-1 fs--1">{label}</span>
      </Nav.Link>
    </Nav.Item>
  );
};

const NavItemPill = ({ index, step, handleNavs, icon, label }) => {
  return (
    <Nav.Item>
      <Nav.Link
        className={classNames('fw-semi-bold', {
          done: step > index,
          active: step === index
        })}
        onClick={() => handleNavs(index)}
      >
        <Flex alignItems="center" justifyContent="center">
          <FontAwesomeIcon icon={icon} />
          <span className="d-none d-md-block mt-1 fs--1 ms-2">{label}</span>
        </Flex>
      </Nav.Link>
    </Nav.Item>
  );
};

RegistMain.propTypes = {
  variant: PropTypes.oneOf(['pills']),
  validation: PropTypes.bool,
  progressBar: PropTypes.bool
};

NavItemPill.propTypes = {
  index: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  handleNavs: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

NavItem.propTypes = NavItemPill.propTypes;

export default RegistMain;
