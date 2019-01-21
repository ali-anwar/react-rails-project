import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as authActions from '../../action/AuthActions';
import SignUpForm from './SignUpForm'; // eslint-disable-line import/no-named-as-default
import { REGULAR_ROLE } from '../../lib/auth';
const DEFAULT_CALORIES = 5000;
import { renderError } from '../../lib/errorMessageRenderer';
export class SignUpContainer extends React.Component {
  componentDidMount() {}

  handleSave = values => {
    let user = values;
    user.calories = DEFAULT_CALORIES;
    user.role = REGULAR_ROLE;

    this.props.action
      .signUp({ user })
      .then(() => {
        toastr.success('Successfully Registered.');
        this.props.history.push('/');
      })
      .catch(error => {
        renderError(error.errors.message);
      });
  };

  render() {
    return (
      <div className="container">
        <SignUpForm
          heading="Sign Up"
          handleSave={this.handleSave}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...authActions }, dispatch)
});

SignUpContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
