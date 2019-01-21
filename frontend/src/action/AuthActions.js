import * as ActionType from './ActionType';
import API from '../lib/api';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';

export const populateUserState = user => ({
  type: ActionType.POPULATE_USER,
  user: user
});

export function signIn(user) {
  let accessToken;
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    return API.post('/users/sign_in', user)
      .then(res => {
        accessToken = res.headers.get('Authorization');
        const json = res.json();
        if (res.ok) {
          return json;
        }
        return json.then(err => {
          throw err;
        });
      })
      .then(user => {
        user.accessToken = accessToken;
        dispatch(ApiCallErrorAction());
        dispatch(populateUserState(user));
      })
      .catch(error => {
        dispatch(ApiCallErrorAction());
        throw error;
      });
  };
}

export function signUp(user) {
  let accessToken;
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    return API.post('/users', user)
      .then(res => {
        accessToken = res.headers.get('Authorization');
        const json = res.json();
        if (res.ok) {
          return json;
        }
        return json.then(err => {
          throw err;
        });
      })
      .then(user => {
        user.accessToken = accessToken;
        dispatch(ApiCallErrorAction());
        dispatch(populateUserState(user));
      })
      .catch(error => {
        dispatch(ApiCallErrorAction());
        throw error;
      });
  };
}
