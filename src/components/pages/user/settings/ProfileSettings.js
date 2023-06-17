import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import FalconDropzone from 'components/common/FalconDropzone';
import FalconCardHeader from 'components/common/FalconCardHeader';

import InputField from 'components/common/WizardInput';
import LabelTootip from 'components/common/LabelTootip';

import { isIterableArray } from 'helpers/utils';
import avatarImg from 'assets/img/team/avatar.png';
import cloudUpload from 'assets/img/icons/cloud-upload.svg';
//import { countrys } from 'data/country';

import { updateProfile } from 'store/slices/User';

const ProfileSettings = ({ user }) => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState([
    ...(user.avater ? user.avater : []),
    { src: user.profileImageUrl || avatarImg }
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors
  } = useForm();

  const watchShowForeigner = watch('isForeigner', user.isForeigner);

  const dispatch = useDispatch();
  const onSubmitData = data => {
    if (!data?.nationality) data.nationality = 'KOR';
    console.log('onSubmitData', data);

    if (avatar[0]?.base64) {
      data.base64ProfileImage = avatar[0]?.base64;
      delete data.avatar;
    }
    dispatch(updateProfile(data)).then(res => {
      const resData = res.payload;
      if (!resData.success) {
        toast.error(resData.message, {
          theme: 'colored'
        });
      } else {
        navigate('/user/profile');
      }
    });
  };

  const onError = () => {};

  return (
    <Card>
      <FalconCardHeader title="Profile Settings" />
      <Card.Body className="bg-light">
        <Form noValidate onSubmit={handleSubmit(onSubmitData, onError)}>
          <Row className="mb-3">
            <Col md="auto">
              <Avatar
                size="4xl"
                src={
                  isIterableArray(avatar)
                    ? avatar[0]?.base64 || avatar[0]?.src
                    : ''
                }
              />
            </Col>
            <Col md>
              <FalconDropzone
                files={avatar}
                onChange={files => {
                  setAvatar(files);
                  setValue('avatar', files);
                }}
                multiple={false}
                accept="image/*"
                placeholder={
                  <>
                    <Flex justifyContent="center">
                      <img
                        src={cloudUpload}
                        alt=""
                        width={25}
                        className="me-2"
                      />
                      <p className="fs-0 mb-0 text-700">
                        Upload your profile picture
                      </p>
                    </Flex>
                    <p className="mb-0 w-75 mx-auto text-400">
                      Upload a 300x300 jpg image with a maximum size of 400KB
                    </p>
                  </>
                }
              />
            </Col>
          </Row>
          <Row className="mb-3 g-3">
            <InputField
              label="Nick Name"
              name="nickName"
              errors={errors}
              formGroupProps={{ as: Col, lg: 6, className: 'mb-3' }}
              formControlProps={{
                ...register('nickName', {
                  required: 'Nick Name field is required',
                  value: user.nickName
                })
              }}
            />
            <InputField
              label="Real Name"
              name="realName"
              errors={errors}
              formGroupProps={{ as: Col, lg: 6, className: 'mb-3' }}
              formControlProps={{
                ...register('realName', {
                  required: 'Real Name field is required',
                  value: user.realName
                })
              }}
            />
          </Row>
          <Row className="mb-3 g-3">
            <InputField
              type="select"
              label="Gender"
              name="gender"
              placeholder="Select your gender..."
              errors={errors}
              formGroupProps={{ as: Col, lg: 6, className: 'mb-3' }}
              formControlProps={{
                ...register('gender', {
                  required: 'Gender field is required',
                  value: user.gender
                })
              }}
              optionProps={{
                defaultOption: true,
                options: [
                  { value: 'male', text: 'Male' },
                  { value: 'female', text: 'Female' }
                ]
              }}
            />
            <InputField
              type="date"
              label="Date of Birth"
              name="birthDate"
              errors={errors}
              setValue={setValue}
              formGroupProps={{ as: Col, lg: 6, className: 'mb-3' }}
              formControlProps={{
                placeholder: 'Date of Birth',
                ...register('birthDate', {
                  required: 'Birth Day field is required'
                })
              }}
              datepickerProps={{
                dateFormat: 'yyyy-MM-dd',
                defaultValue: user.birthDate
              }}
            />
          </Row>
          <Row className="mb-3">
            <InputField
              type="switch"
              label={
                <LabelTootip
                  label="Foreigner"
                  tooltip="please foreigner check"
                />
              }
              name="isForeigner"
              id="isForeigner-yes"
              errors={errors}
              formControlProps={{
                ...register('isForeigner', {
                  value: user.isForeigner,
                  onChange: e => {
                    clearErrors('nationality');
                    if (!e.target.checked) setValue('nationality', '');
                    else setValue('nationality', user.nationality);
                  }
                })
              }}
            />
            <InputField
              name="nationality"
              errors={errors}
              formGroupProps={{ as: Col, lg: 6, className: 'mb-3' }}
              formControlProps={{
                ...register('nationality', {
                  maxLength: {
                    value: 3,
                    message: '최대 3자까지만 입력가능합니다.' // JS only: <p>error message</p> TS only support string
                  },
                  validate: value => {
                    if (watchShowForeigner && !value)
                      return 'Required field for foreigners';
                  },
                  value: user.nationality,
                  disabled: !watchShowForeigner
                })
              }}
            />
            {/* <InputField
              type="select"
              name="nationality_new"
              placeholder="Select your country..."
              errors={errors}
              formGroupProps={{ className: 'mb-3' }}
              formControlProps={{
                ...register('nationality_new', {
                  validate: value => {
                    if (watchShowForeigner && !value)
                      return 'Required selection for foreigners';
                  },
                  setValueAs: v => v || '',
                  value: user.nationality,
                  disabled: !watchShowForeigner
                })
              }}
              optionProps={{
                defaultOption: true,
                options: countrys
              }}
            /> */}
          </Row>
          <div className="text-end">
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

ProfileSettings.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileSettings;
