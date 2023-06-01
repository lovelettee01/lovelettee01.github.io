import { companyResourcesData } from 'data/elearning/createCompany';
import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import CompanyCoverPhoto from './CompanyCoverPhoto';
import CompanyGoals from './CompanyGoals';
import CompanyInformationForm from './CompanyInformationForm';
import CompanyPreviewVideo from './CompanyPreviewVideo';
import CompanyPricing from './CompanyPricing';
import CompanyRequirements from './CompanyRequirements';
import CompanyResources from './CompanyResources';
import CreateCompanyHeader from './CreateCompanyHeader';
import PublishCompany from './PublishCompany';
import ScheduleDiscountModal from './ScheduleDiscountModal';

const CreateCompany = () => {
  const [isOpenScheduleModal, setIsOpenScheduleModal] = useState(false);
  const defaultValues = {
    timeZone: 'GMT-12:00/Etc/GMT-12'
  };
  const submittedValues = {};
  const { register, handleSubmit, setValue, control, reset } = useForm({
    defaultValues
  });

  const onSubmit = data => {
    console.log(data);
    // ------- Get all object keys form data and set empty values to reset ------------
    const keys = Object.keys(data);
    for (const key of keys) {
      submittedValues[key] = '';
    }
    const allValues = { ...submittedValues, ...defaultValues };
    reset({ ...allValues });
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-lg-3 font-sans-serif">
          <Col lg={8}>
            <CreateCompanyHeader />
            <CompanyInformationForm
              register={register}
              setValue={setValue}
              control={control}
            />
            <CompanyResources data={companyResourcesData} />
            <CompanyRequirements />
            <CompanyGoals control={control} />
          </Col>
          <Col lg={4}>
            <div className="sticky-sidebar top-navbar-height d-flex flex-column">
              <PublishCompany />
              <CompanyCoverPhoto />
              <CompanyPreviewVideo register={register} />
              <CompanyPricing
                register={register}
                isOpenScheduleModal={isOpenScheduleModal}
                setIsOpenScheduleModal={setIsOpenScheduleModal}
              />
            </div>
          </Col>
        </Row>
      </Form>
      {/* Modal */}
      <ScheduleDiscountModal
        isOpenScheduleModal={isOpenScheduleModal}
        setIsOpenScheduleModal={setIsOpenScheduleModal}
      />
    </>
  );
};

export default CreateCompany;
