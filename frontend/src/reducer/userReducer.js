import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';

const userReducer = (state = initialState.userReducer, action) => {
  switch (action.type) {
    case ActionType.POPULATE_USER: {
      if (action.user) {
        localStorage.setItem('user', JSON.stringify(action.user));
      }
      return {
        ...state,
        currentUser: action.user ? _.assign(action.user) : null
      };
    }
    case ActionType.GET_USERS: {
      return {
        ...state,
        users: _.assign([]),
        loading: true,
        error: false
      };
    }
    case ActionType.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: _.assign(action.users),
        loading: false,
        error: false
      };
    }
    case ActionType.GET_USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        users: _.assign([])
      };
    }
    case ActionType.DELETE_USER: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case ActionType.DELETE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        users: _.assign(state.users.filter(user => user.id !== action.userId))
      };
    }
    case ActionType.DELETE_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case ActionType.SET_SELECTED_USER: {
      return {
        ...state,
        selectedUserId: action.userId
      };
    }
    case ActionType.GET_USER: {
      return {
        ...state,
        loading: true,
        error: false,
        user: _.assign(state.users.find(user => user.id === action.userId))
      };
    }
    case ActionType.GET_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        user: _.assign(action.user)
      };
    }
    case ActionType.GET_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        user: undefined
      };
    }
    case ActionType.RESET_SELECTED_USER: {
      return {
        ...state,
        user: {}
      };
    }
    case ActionType.CREATE_USER: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case ActionType.CREATE_USER_SUCCESS: {
      let updatedUsers = _.assign(state.users);
      updatedUsers.push(action.user);

      return {
        ...state,
        users: _.assign(updatedUsers),
        loading: false,
        error: false
      };
    }
    case ActionType.CREATE_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case ActionType.UPDATE_USER: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case ActionType.UPDATE_USER_SUCCESS: {
      let updatedUsers = _.assign(state.users);
      const existingUserIndex = updatedUsers.findIndex(
        user => user.id === action.user.id
      );
      updatedUsers.splice(existingUserIndex, 1, action.user);

      return {
        ...state,
        users: _.assign(updatedUsers),
        loading: false,
        error: false
      };
    }
    case ActionType.UPDATE_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case ActionType.UPDATE_CURRENT_USER_CALORIES: {
      let updatedCurrentUser = _.assign(state.currentUser);
      updatedCurrentUser.calories = action.user.calories;

      return {
        ...state,
        currentUser: updatedCurrentUser
      }
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
