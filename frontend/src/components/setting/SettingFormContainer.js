import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userAction from "../../action/UserActions";
import SettingForm from "./SettingForm";
import toastr from 'toastr';
import { renderError } from '../../lib/errorMessageRenderer';

export class SettingFormContainer extends React.Component {
  componentDidMount() {
    this.props.action.getUserAction(this.props.match.params.id);
  }

  handleSave = values => {
    const user = {
      id: values.id,
      calories: values.calories
    };

    if (user.id) {
      this.props.action.updateUserAction(user, this.props.currentUser).then(() => {
        toastr.success('Settings have been updated successfully');
        this.props.history.push("/");
      })
      .catch(error => {
        renderError(error.errors.message);
      });
    }
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.history.replace("/");
  };

  render() {
    let initialValues = {
      id: this.props.currentUser.id,
      calories: this.props.currentUser.calories
    }

    return (
      <div className="container">
        <SettingForm
          handleSave={this.handleSave}
          handleCancel={this.handleCancel}
          initialValues={initialValues}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...userAction }, dispatch)
});

SettingFormContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingFormContainer);
