import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
import SelectInput from '../common/SelectInput';
import moment from 'moment';
import {
  EDIT_MEAL,
  EDIT_MEAL_BUTTON_TEXT,
  CREATE_MEAL_BUTTON_TEXT
} from '../../lib/formHeadings';
import DatePickerInput from '../common/DatePicker';
import _ from 'lodash';

export const MealForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  handleSave,
  handleCancel,
  displayUserDropdown,
  userOptions
}) => {
  let userDropdownField = null;
  let submitButtonText = '';

  if (displayUserDropdown) {
    userDropdownField = (
      <Field
        type="text"
        name="user_id"
        label="User"
        options={userOptions}
        component={SelectInput}
      />
    );
  }

  if (heading === EDIT_MEAL) {
    submitButtonText = EDIT_MEAL_BUTTON_TEXT;
  } else {
    submitButtonText = CREATE_MEAL_BUTTON_TEXT;
  }

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="mt-4 mb-4"><h1>{heading}</h1></div>

      <Field type="text" name="text" label="Text" component={FieldInput} />

      <Field
        type="number"
        name="no_of_calories"
        label="Calories"
        component={FieldInput}
      />

      <Field name="date" label="Date" component={DatePickerInput} />

      <Field type="time" name="time" label="Time" component={FieldInput} />

      {userDropdownField}

      <div>
        <button type="submit" disabled={submitting} className="btn btn-primary">
          {submitButtonText}
        </button>

        <button
          type="button"
          className="btn btn-gray pull-right"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const validate = (values, props) => {
  const errors = {};

  const TEXT_MAX_LENGTH = 100;
  const TEXT_MIN_LENGTH = 3;
  const DESCRIPTION_MAX_LENGTH = 255;
  const DESCRIPTION_MIN_LENGTH = 20;
  const MIN_CALORIES = 0;
  const MIN_YEAR = 1970;
  const MAX_YEAR = new Date().getFullYear();

  if (!values.text) {
    errors.text = 'Text can not be blank';
  } else if (values.text && values.text.length > TEXT_MAX_LENGTH) {
    errors.text = `Text is too long, it should not be longer than ${TEXT_MAX_LENGTH} characters`;
  } else if (values.text && values.text.length < TEXT_MIN_LENGTH) {
    errors.text = `Text is too short, it should be at least ${TEXT_MIN_LENGTH} characters`;
  }

  if (!values.description) {
    errors.description = 'Description can not be blank';
  } else if (
    values.description &&
    values.description.length > DESCRIPTION_MAX_LENGTH
  ) {
    errors.description = `Description is too long, it should not be longer than ${DESCRIPTION_MAX_LENGTH} characters`;
  } else if (
    values.description &&
    values.description.length < DESCRIPTION_MIN_LENGTH
  ) {
    errors.description = `Description is too short, it should be at least ${DESCRIPTION_MIN_LENGTH} characters`;
  }

  if (!values.no_of_calories) {
    errors.no_of_calories = 'Calories must be a valid number';
  } else if (values.no_of_calories && values.no_of_calories < MIN_CALORIES) {
    errors.no_of_calories = `Calories can not be less than ${MIN_CALORIES} for a meal`;
  }

  if (!values.date || values.date === 'Invalid date') {
    errors.date = 'Date can not be blank';
  } else if (moment(values.date, 'YYYY-MM-DD').year() < MIN_YEAR) {
    errors.date = `Year can not be less than ${MIN_YEAR}`;
  } else if (moment(values.date, 'YYYY-MM-DD').year() > MAX_YEAR) {
    errors.date = `Year can not be greater than ${MAX_YEAR}`;
  }

  if (!values.time) {
    errors.time = 'Time can not be blank';
  }

  if (props.displayUserDropdown && !values.user_id) {
    errors.user_id = 'Please assign meal to a User';
  }

  return errors;
};

MealForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'MealForm',
  validate
})(MealForm);
