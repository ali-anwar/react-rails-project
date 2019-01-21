import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as authActions from '../../action/AuthActions';
import SignInForm from './SignInForm'; // eslint-disable-line import/no-named-as-default

export class SignInContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {}

  handleSave(values) {
    const user = values;
    this.props.action
      .signIn({ user })
      .then(() => {
        toastr.success('Successfully Logged In.');
        this.props.history.push('/');
      })
      .catch(error => {
        toastr.error(error.error);
      });
  }

  render() {
    return (
      <div className="container">
        <SignInForm heading="Sign In" handleSave={this.handleSave} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...authActions }, dispatch)
});

SignInContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
