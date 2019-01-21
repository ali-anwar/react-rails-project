import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
import SelectInput from '../common/SelectInput';
import { validateEmail } from '../../lib/customValidator';
import {
  EDIT_USER,
  EDIT_USER_BUTTON_TEXT,
  CREATE_USER_BUTTON_TEXT
} from '../../lib/formHeadings';
import { ROLES } from '../../lib/roles';
import StaticDataField from '../common/StaticDataField';

export const UserForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  handleSave,
  handleCancel,
  userEmail
}) => {
  let submitButtonText = '';
  let userEmailField = null;

  if (heading === EDIT_USER) {
    submitButtonText = EDIT_USER_BUTTON_TEXT;
    userEmailField = <StaticDataField label="Email" value={userEmail} />;
  } else {
    submitButtonText = CREATE_USER_BUTTON_TEXT;
    userEmailField = (
      <Field type="email" name="email" label="Email" component={FieldInput} />
    );
  }

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="mt-4 mb-4">
        <h1>{heading}</h1>
      </div>

      <Field type="text" name="name" label="Name" component={FieldInput} />

      {userEmailField}

      <Field name="role" label="Role" options={ROLES} removeDefault={true} component={SelectInput} />

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

const validate = values => {
  const errors = {};
  const NAME_MAX_LENGTH = 100;
  const NAME_MIN_LENGTH = 3;

  if (!values.name) {
    errors.name = 'Name can not be blank';
  } else if (values.name && values.name.length > NAME_MAX_LENGTH) {
    errors.name = `Name is too long, it should not be longer than ${NAME_MAX_LENGTH} characters`;
  } else if (values.name && values.name.length < NAME_MIN_LENGTH) {
    errors.name = `Name is too short, it should be at least ${NAME_MIN_LENGTH} characters`;
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.role) {
    errors.role = 'Required';
  }

  return errors;
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'UserForm',
  validate
})(UserForm);
