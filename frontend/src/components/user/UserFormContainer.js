import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userAction from "../../action/UserActions";
import UserForm from "./UserForm";
import { EDIT_USER, CREATE_USER } from "../../lib/formHeadings";
import toastr from 'toastr';
import { renderError } from '../../lib/errorMessageRenderer';

export class UserFormContainer extends React.Component {
  handleSave = values => {
    const user = {
      id: values.id,
      name: values.name,
      email: values.email,
      role: values.role
    };

    if (user.id) {
      this.props.action
        .updateUserAction(user, this.props.currentUser)
        .then(() => {
          toastr.success("User has been updated successfully");
          this.props.history.push("/users");
        })
        .catch(error =>
          renderError(error.errors.message)
        );
    } else {
      this.props.action
        .createUserAction(user, this.props.currentUser)
        .then(() => {
          toastr.success("User has been created successfully");
          this.props.history.push("/users");
        })
        .catch(error =>
          renderError(error.errors.message)
        );
    }
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.history.replace("/users");
  };

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues.id ? EDIT_USER : CREATE_USER;

    return (
      <div className="container">
        <UserForm
          heading={heading}
          handleSave={this.handleSave}
          handleCancel={this.handleCancel}
          initialValues={this.props.initialValues}
          userEmail={this.props.initialValues.email}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.userReducer.user,
  currentUser: state.userReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...userAction }, dispatch)
});

UserFormContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFormContainer);
