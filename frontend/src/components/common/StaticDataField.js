import React from "react";
import PropTypes from 'prop-types';

const StaticDataField = ({
  value,
  label
}) => {
  return (
    <div className="form-group d-flex form-field row">
      <label className="col-sm-2 align-self-end">
        {label}
      </label>

      <div className="col-sm-10">
        {value}
      </div>
    </div>
  );
};

StaticDataField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default StaticDataField;
