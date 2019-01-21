import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
import { validateEmail } from "../../lib/customValidator";

export const SignUpForm = ({
  handleSubmit,
  submitting,
  heading,
  handleSave,
}) => {
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="mt-4 mb-4"><h1>{heading}</h1></div>

      <Field type="text" name="name" label="Name" component={FieldInput} />

      <Field
        type="email"
        name="email"
        label="Email"
        component={FieldInput}
      />

      <Field
        type="password"
        name="password"
        label="Password"
        component={FieldInput}
      />

      <Field
        type="password"
        name="confirmpassword"
        label="Password Confirmation"
        component={FieldInput}
      />

      <div>
        <button type="submit" disabled={submitting} className="btn btn-primary">
          Sign Up
        </button>
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};
  const PASSWORD_MAX_LENGTH = 100;
  const NAME_MAX_LENGTH = 100;
  const PASSWORD_MIN_LENGTH = 8;
  const NAME_MIN_LENGTH = 3;

  if (!values.name) {
    errors.name = "Name can not be blank";
  } else if (values.name && values.name.length > NAME_MAX_LENGTH) {
    errors.name = `Name is too long, it should not be longer than ${NAME_MAX_LENGTH} characters`;
  } else if (values.name && values.name.length < NAME_MIN_LENGTH) {
    errors.name = `Name is too short, it should be at least ${NAME_MIN_LENGTH} characters`;
  }

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

  if (!values.confirmpassword) {
    errors.confirmpassword = "Confirm Password can not be blank";
  } else if (values.confirmpassword !== values.password) {
    errors.confirmpassword = "Passwords do not match";
  }

  return errors;
};

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'SignInForm',
  validate
})(SignUpForm);
