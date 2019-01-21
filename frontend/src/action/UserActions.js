import * as ActionType from './ActionType';
import API from '../lib/api';
import { makeRequest } from '../lib/requestWrapper';

export const getUsers = {
  type: ActionType.GET_USERS
};

export const getUsersSuccess = users => ({
  type: ActionType.GET_USERS_SUCCESS,
  users
});

export const getUsersFailure = error => ({
  type: ActionType.GET_USERS_FAILURE,
  error
});

export const createUser = {
  type: ActionType.CREATE_USER
};

export const createUserSuccess = user => ({
  type: ActionType.CREATE_USER_SUCCESS,
  user
});

export const createUserFailure = error => ({
  type: ActionType.CREATE_USER_FAILURE,
  error
});

export const deleteUser = {
  type: ActionType.DELETE_USER
};

export const deleteUserSuccess = userId => ({
  type: ActionType.DELETE_USER_SUCCESS,
  userId
});

export const deleteUserFailure = error => ({
  type: ActionType.DELETE_USER_FAILURE,
  error
});

export const updateUser = {
  type: ActionType.UPDATE_USER
};

export const updateUserSuccess = user => ({
  type: ActionType.UPDATE_USER_SUCCESS,
  user
});

export const updateUserFailure = error => ({
  type: ActionType.UPDATE_USER_FAILURE,
  error
});

export const setSelectedUser = userId => ({
  type: ActionType.SET_SELECTED_USER,
  userId
});

export const getUser = userId => ({
  type: ActionType.GET_USER,
  userId
});

export const getUserSuccess = user => ({
  type: ActionType.GET_USER_SUCCESS,
  user
});

export const getUserFailure = error => ({
  type: ActionType.GET_USER_FAILURE,
  error
});

export const resetSelectedUser = {
  type: ActionType.RESET_SELECTED_USER
};

export const updateCurrentUserCalories = user => ({
  type: ActionType.UPDATE_CURRENT_USER_CALORIES,
  user
});

export function setSelectedUserAction(selectedUserId) {
  return dispatch => {
    dispatch(setSelectedUser(selectedUserId));
  };
}

export function getUserAction(userId) {
  return dispatch => {
    dispatch(getUser(userId));
  };
}

export function resetUserAction() {
  return dispatch => {
    dispatch(resetSelectedUser);
  };
}

export function getUsersAction(currentUser) {
  return dispatch => {
    dispatch(getUsers);

    return makeRequest(API.get('/api/v1/users', currentUser.accessToken))
      .then(users => {
        dispatch(getUsersSuccess(users));
      })
      .catch(error => {
        dispatch(getUsersFailure(error));
        throw error;
      });
  };
}

export function deleteUserAction(selectedUserId, currentUser) {
  return dispatch => {
    dispatch(deleteUser);

    return makeRequest(
      API.delete(
        `/api/v1/users/${selectedUserId}`,
        null,
        currentUser.accessToken
      )
    )
      .then(() => {
        dispatch(deleteUserSuccess(selectedUserId));
      })
      .catch(error => {
        dispatch(deleteUserFailure(error));
        throw error;
      });
  };
}

export function updateUserAction(user, currentUser) {
  return dispatch => {
    dispatch(updateUser);

    return makeRequest(
      API.put(`/api/v1/users/${user.id}`, user, currentUser.accessToken)
    )
      .then(user => {
        if (
          user.id === currentUser.id &&
          currentUser.calories !== user.calories
        ) {
          dispatch(updateCurrentUserCalories(user));
        }
        dispatch(updateUserSuccess(user));
      })
      .catch(error => {
        dispatch(updateUserFailure(error));
        throw error;
      });
  };
}

export function createUserAction(user, currentUser) {
  return dispatch => {
    dispatch(createUser);

    return makeRequest(API.post('/api/v1/users', user, currentUser.accessToken))
      .then(user => {
        dispatch(createUserSuccess(user));
      })
      .catch(error => {
        dispatch(createUserFailure(error));
        throw error;
      });
  };
}
