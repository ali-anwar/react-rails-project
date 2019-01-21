import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as authActions from '../../action/AuthActions';
import Spinner from '../common/Spinner';
import { REGULAR_ROLE, MANAGER_ROLE, ADMIN_ROLE } from '../../lib/auth';

export class HeaderNavContainer extends React.Component {
  renderButtons() {
    if (this.props.currentUser) {
      let currentUser = this.props.currentUser;

      return (
        <ul className="nav navbar-nav">
          <li className="dropdown nav-item nav-link">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              <i className="fa fa-user" />
              <span className="caret" />
            </a>
            <ul className="dropdown-menu">
              {currentUser &&
                (currentUser.role === REGULAR_ROLE ||
                  currentUser.role === MANAGER_ROLE) && (
                  <li className="text-center">
                    <NavLink
                      className="nav-item nav-link link-colors"
                      activeClassName="active"
                      to="/settings"
                    >
                      Settings
                    </NavLink>
                    <div className="dropdown-divider" />
                  </li>
                )}
              {/* {currentUser &&
                (currentUser.role === MANAGER_ROLE ||
                  currentUser.role === ADMIN_ROLE) && (
                  <li className="text-center">
                    <NavLink
                      className="nav-item nav-link link-colors"
                      activeClassName="active"
                      to="/users"
                    >
                      Users
                    </NavLink>
                    <div className="dropdown-divider"></div>
                  </li>
                )} */}
              {currentUser && (
                <li className="text-center">
                  <button
                    id="signOut"
                    className="nav-item nav-link btn btn-link link-colors mx-auto"
                    onClick={() => {
                      localStorage.setItem('user', null);
                      this.props.action.populateUserState(null);
                      this.props.history.push('/');
                    }}
                  >
                    Sign out
                  </button>
                </li>
              )}
            </ul>
          </li>
        </ul>
      );
    } else {
      return (
        <div className="form-inline navbar-nav">
          <NavLink
            className="nav-item nav-link"
            activeClassName="active"
            to="/login"
          >
            Sign In
          </NavLink>
          <NavLink
            className="nav-item nav-link"
            activeClassName="active"
            to="/signup"
          >
            Sign Up
          </NavLink>
        </div>
      );
    }
  }
  render() {
    const { currentUser } = this.props;
    return (
      <nav className="navbar navbar-toggleable-sm bg-info navbar-inverse">
        <div className="container">
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#mainNav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav mr-auto">
              <NavLink
                className="navbar-brand"
                exact
                activeClassName="active"
                to="/"
              >
                Home
              </NavLink>
              {currentUser &&
                (currentUser.role === MANAGER_ROLE ||
                  currentUser.role === ADMIN_ROLE) && (
                  <NavLink
                    className="nav-item nav-link link-colors"
                    activeClassName="active"
                    to="/users"
                  >
                    Users
                  </NavLink>
                )}
              <span className="ml-5">
                {this.props.apiCallsInProgress > 0 && (
                  <Spinner
                    className="nav-item nav-link"
                    interval={100}
                    dots={20}
                  />
                )}
              </span>
            </div>

            {this.renderButtons()}
          </div>
        </div>
      </nav>
    );
  }
}

HeaderNavContainer.propTypes = {
  apiCallsInProgress: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  apiCallsInProgress: state.apiReducer.apiCallsInProgress,
  currentUser: state.userReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...authActions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderNavContainer);
