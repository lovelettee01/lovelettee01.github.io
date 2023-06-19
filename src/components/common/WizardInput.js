import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomDateInput = forwardRef(
  (
    { value, onClick, isInvalid, isValid, formControlProps, errorMessage },
    ref
  ) => {
    return (
      <>
        <Form.Control
          ref={ref}
          isInvalid={isInvalid}
          isValid={isValid}
          value={value}
          className="ps-4"
          onClick={onClick}
          {...formControlProps}
        />
        <FontAwesomeIcon
          icon="calendar-alt"
          className="text-primary position-absolute top-50 translate-middle-y ms-2"
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </>
    );
  }
);

const WizardInput = ({
  label,
  name,
  errors,
  type = 'text',
  placeholder,
  formControlProps,
  formGroupProps,
  optionProps,
  setValue,
  datepickerProps
}) => {
  const [date, setDate] = useState(
    datepickerProps?.defaultValue && new Date(datepickerProps?.defaultValue)
  );
  if (type === 'date') {
    const dateFormat = String(
      datepickerProps?.dateFormat || 'YYYY-MM-dd'
    ).toUpperCase();
    return (
      <Form.Group {...formGroupProps}>
        {!!label && <Form.Label>{label}</Form.Label>}

        <DatePicker
          selected={date}
          onChange={date => {
            setDate(date);
            setValue(name, moment(date).format(dateFormat));
          }}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          customInput={
            <CustomDateInput
              formControlProps={formControlProps}
              errorMessage={errors[name]?.message}
              isInvalid={!!errors[name]}
              isValid={Object.keys(errors).length > 0 && !errors[name]}
            />
          }
          {...datepickerProps}
        />
      </Form.Group>
    );
  }

  if (type === 'checkbox' || type === 'switch' || type === 'radio') {
    return (
      <Form.Group {...formGroupProps}>
        <Form.Check type={type} id={name + Math.floor(Math.random() * 100)}>
          <Form.Check.Input
            type={type === 'switch' ? 'checkbox' : type}
            {...formControlProps}
            isInvalid={!!errors[name]}
            isValid={Object.keys(errors).length > 0 && !errors[name]}
          />
          <Form.Check.Label className="ms-2">{label}</Form.Check.Label>
          <Form.Control.Feedback type="invalid" className="mt-0">
            {errors[name]?.message}
          </Form.Control.Feedback>
        </Form.Check>
      </Form.Group>
    );
  }
  if (type === 'select') {
    return (
      <Form.Group {...formGroupProps}>
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Select
          type={type}
          {...formControlProps}
          isInvalid={!!errors[name]}
          isValid={Object.keys(errors).length > 0 && !errors[name]}
        >
          {!!optionProps?.defaultOption && (
            <option value="">{placeholder}</option>
          )}
          {optionProps.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors[name]?.message}
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  if (type === 'textarea') {
    return (
      <Form.Group {...formGroupProps}>
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control
          as="textarea"
          placeholder={placeholder}
          {...formControlProps}
          isValid={Object.keys(errors).length > 0 && !errors[name]}
          isInvalid={!!errors[name]}
          rows={4}
        />
        <Form.Control.Feedback type="invalid">
          {errors[name]?.message}
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  return (
    <Form.Group {...formGroupProps}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...formControlProps}
        isInvalid={!!errors[name]}
        isValid={Object.keys(errors).length > 0 && !errors[name]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

CustomDateInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  isInvalid: PropTypes.bool,
  isValid: PropTypes.bool,
  formControlProps: PropTypes.object,
  errorMessage: PropTypes.string
};

WizardInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
  type: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  formControlProps: PropTypes.object,
  formGroupProps: PropTypes.object,
  optionProps: PropTypes.object,
  setValue: PropTypes.func,
  datepickerProps: PropTypes.object
};

WizardInput.defaultProps = { required: false };

export default WizardInput;
