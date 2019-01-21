import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({
  input,
  name,
  label,
  defaultOption,
  options,
  removeDefault,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="form-group d-flex form-field row">
      <div className="col-sm-2 align-self-end" htmlFor={name}>
        {label}
      </div>
      <div className="col-sm-10">
        <select {...input} autoFocus={true} name={name} className="form-control">
          {removeDefault ? null : <option>{defaultOption}</option>}
          {options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>

        {touched &&
          ((error && <p className="text-danger">{error}</p>) ||
            (warning && <p className="text-danger">{warning}</p>))}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  defaultOption: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  meta: PropTypes.object.isRequired
};

export default SelectInput;
