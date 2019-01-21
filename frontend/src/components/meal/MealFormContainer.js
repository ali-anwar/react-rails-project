import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mealAction from "../../action/MealActions";
import * as userAction from "../../action/UserActions";
import MealForm from "./MealForm";
import { ADMIN_ROLE } from "../../lib/auth";
import { EDIT_MEAL, CREATE_MEAL } from "../../lib/formHeadings";
import toastr from "toastr";
import { renderError } from "../../lib/errorMessageRenderer";
export class MealFormContainer extends React.Component {
  isCurrentAdminUser = () => {
    return this.props.currentUser.role === ADMIN_ROLE;
  };

  getUsersForDropdown = () => {
    let users = [];
    if (!this.isCurrentAdminUser()) {
      return users;
    }
    if (this.props.users && this.props.users.length > 0) {
      users = this.props.users;
    } else {
      this.props.action
        .getUsersAction(this.props.getUsersAction)
        .then(usersResponse => {
          users = usersResponse;
        });
    }

    return users
      .map(user => {
        return { value: user.id, text: user.name };
      });
  };

  handleSave = values => {
    let meal = {
      id: values.id,
      text: values.text,
      no_of_calories: values.no_of_calories,
      date: values.date,
      time: values.time
    };

    meal.user_id = values.user_id ? values.user_id : this.props.currentUser.id;

    if (meal.id) {
      this.props.action
        .updateMealAction(meal, this.props.currentUser)
        .then(() => {
          toastr.success("Meal has been updated successfully!");
          this.props.history.push("/meals");
        })
        .catch(error => {
          renderError(error.errors.message);
        });
    } else {
      this.props.action
        .createMealAction(meal, this.props.currentUser)
        .then(() => {
          toastr.success("Meal has been created successfully!");
          this.props.history.push("/meals");
        })
        .catch(error => {
          renderError(error.errors.message);
        });
    }
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.history.replace("/meals");
  };

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues.id ? EDIT_MEAL : CREATE_MEAL;

    return (
      <div className="container">
        <MealForm
          heading={heading}
          handleSave={this.handleSave}
          handleCancel={this.handleCancel}
          initialValues={this.props.initialValues}
          displayUserDropdown={this.isCurrentAdminUser()}
          userOptions={this.getUsersForDropdown()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.mealReducer.meal,
  currentUser: state.userReducer.currentUser,
  users: state.userReducer.users
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...mealAction, ...userAction }, dispatch)
});

MealFormContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealFormContainer);
