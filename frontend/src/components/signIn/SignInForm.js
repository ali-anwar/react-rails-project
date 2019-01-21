import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
import { validateEmail } from "../../lib/customValidator";

export const SignInForm = ({
  handleSubmit,
  submitting,
  heading,
  handleSave
}) => {
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="mt-4 mb-4"><h1>{heading}</h1></div>

      <Field type="email" name="email" label="Email" component={FieldInput} />

      <Field
        type="password"
        name="password"
        label="Password"
        component={FieldInput}
      />

      <div>
        <button type="submit" disabled={submitting} className="btn btn-primary">
          Sign In
        </button>
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};
  const PASSWORD_MAX_LENGTH = 100;
  const PASSWORD_MIN_LENGTH = 8;

  if (!values.password) {
    errors.password = "Password can not be blank";
  } else if (values.password && values.password.length > PASSWORD_MAX_LENGTH) {
    errors.password = `Password is too long, it should not be longer than ${PASSWORD_MAX_LENGTH} characters`;
  } else if (values.password && values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Password is too short, it should be at least ${PASSWORD_MIN_LENGTH} characters`;
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!validateEmail(values.email)) {
    errors.email = "Email is invalid";
  }

  return errors;
};

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'SignInForm',
  validate
})(SignInForm);
