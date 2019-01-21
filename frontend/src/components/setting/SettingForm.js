import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';

const maxLenght = max => value => {
  let v;
  let result = value.length > max;

  if (result === false) {
    v = value;
  }
  return v;
};

export const SettingForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  handleSave,
  handleCancel
}) => {
  return (
    <form className="mt-4" onSubmit={handleSubmit(handleSave)}>
      <div className="mt-4 mb-4">
        <h1>User Settings</h1>
      </div>

      <Field
        type="number"
        name="calories"
        label="Calories"
        normalize={maxLenght(10)}
        component={FieldInput}
      />

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary mr-sm-2"
        >
          Save
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

const validate = values => {
  const errors = {};

  if (!values.calories) {
    errors.calories = 'Calories must be a valid number';
  } else if (values.calories.length > 10) {
    errors.calories = 'Calories can not exceed charachter limit 10';
  }

  return errors;
};

SettingForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'SettingForm',
  validate
})(SettingForm);
