import React from 'react';
import PropTypes from 'prop-types';

const camelize = function camelize(str) {
  return str.replace(/\W+(.)/g, function(match, chr) {
    return chr.toUpperCase();
  });
};

const FieldInput = ({
  input,
  type,
  name,
  label,
  placeholder,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="form-group d-flex form-field row">
      <label className="col-sm-2 align-self-end" htmlFor={name}>
        {label}
      </label>

      <div className="col-sm-10">
        <input
          {...input}
          type={type}
          name={camelize(label)}
          className="form-control"
          placeholder={placeholder}
        />

        {touched &&
          ((error && <p className="text-danger">{error}</p>) ||
            (warning && <p className="text-danger">{warning}</p>))}
      </div>
    </div>
  );
};

FieldInput.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired
};

export default FieldInput;
