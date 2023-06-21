import React from 'react';
import PropTypes from 'prop-types';
import CustomModal from 'components/common/CustomModal';
import Terms from './Terms';
import PrivacyPolicy from './PrivacyPolicy';
import PrivacyPolicy2 from './PrivacyPolicy2';

const termsType = type => {
  if (type === 'terms')
    return {
      title: '서비스 약관',
      message: <Terms />
    };
  else if (type === 'policy')
    return {
      title: '개인정보 처리방침',
      message: <PrivacyPolicy />
    };
  else if (type === 'policy2')
    return {
      title: '개인정보 제3자 제공동의',
      message: <PrivacyPolicy2 />
    };
};

const Agreement = ({ modal, showModal, type }) => {
  const typeObj = termsType(type);
  return (
    <CustomModal
      modal={modal}
      showModal={showModal}
      title={typeObj.title}
      message={typeObj.message}
      modalProps={{ fullscreen: true }}
    />
  );
};

Agreement.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default Agreement;
