import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../action/UserActions';
import UserList from './UserList';
import toastr from 'toastr';
import { renderError } from '../../lib/errorMessageRenderer';
import Loader from 'react-loader-spinner';

export class UserListContainer extends React.Component {
  componentDidMount() {
    this.props.action.getUsersAction(this.props.currentUser).catch(error => {
      renderError(error.errors.message);
    });
  }

  handleAddUser = () => {
    this.props.action.resetUserAction();
    this.props.history.push('/users/new');
  };

  handleEditUser = id => {
    const selectedUserId = id;

    if (selectedUserId) {
      this.props.action.getUserAction(selectedUserId);
      this.props.action.setSelectedUserAction(undefined);
      this.props.history.push(`/user/${selectedUserId}`);
    }
  };

  handleDelete = id => {
    const selectedUserId = id;

    if (selectedUserId) {
      this.props.action.setSelectedUserAction(undefined);
      this.props.action
        .deleteUserAction(selectedUserId, this.props.currentUser)
        .then(() => {
          toastr.success('User has been deleted successfully');
        })
        .catch(error => {
          renderError(error.errors.message);
        });
    }
  };

  handleRowSelect = (row, isSelected) => {
    if (isSelected) {
      this.props.action.setSelectedUserAction(row.id);
    }
  };

  getUsersExceptCurrent(users) {
    let filteredUsers = [];
    for (const user of users) {
      if (user.id !== this.props.currentUser.id) {
        filteredUsers.push(user);
      }
    }
    return filteredUsers;
  }

  render() {
    const { users, loading, error } = this.props;

    if (loading) {
      return (
        <div className="loading-spinner">
          <Loader type="Oval" color="#00BFFF" height="50" width="50" />
        </div>
      );
    }

    if (error) {
      return <div>Failed to Load Users, Please Try Again</div>;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="mt-4 mb-4">
              <h1>Users</h1>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleAddUser}
              >
                <i className="fa fa-plus" aria-hidden="true" /> New
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <UserList
              users={users}
              handleRowSelect={this.handleRowSelect}
              handleDeleteButton={this.handleDelete}
              handleEditButton={this.handleEditUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userReducer.users,
  loading: state.userReducer.loading,
  error: state.userReducer.error,
  selectedUserId: state.userReducer.selectedUserId,
  currentUser: state.userReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(userAction, dispatch)
});

UserListContainer.propTypes = {
  users: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListContainer);
