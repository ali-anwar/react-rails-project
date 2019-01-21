import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class DatePickerInput extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.bool
    }),
    placeholder: PropTypes.string
  };

  static defaultProps = {
    placeholder: ""
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    if (date) {
      this.props.input.onChange(moment(date).format("YYYY-MM-DD"));
    }
  }

  render() {
    const {
      input,
      placeholder,
      label,
      meta: { touched, warning, error }
    } = this.props;

    return (
      <div className="form-group d-flex form-field row">
        <label className="col-sm-2 align-self-end" htmlFor={name}>
          {label}
        </label>

        <div className="col-sm-10">
          <DatePicker
            {...input}
            placeholder={placeholder}
            dateFormat="YYYY-MM-DD"
            autoComplete="off"
            className="form-control"
            selected={input.value ? moment(input.value, "YYYY-MM-DD") : null}
            onChange={this.handleChange}
          />

          {touched &&
            ((error && <p className="text-danger">{error}</p>) ||
              (warning && <p className="text-danger">{warning}</p>))}
        </div>
      </div>
    );
  }
}

export default DatePickerInput;
