import apiReducer from '../apiReducer';
import * as ActionType from '../../action/ActionType';

describe('userReducer.test.js', ()  => {

  it('has a default state', () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };
    const action = { type: 'blah blah' };
    const newState = apiReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it(`should increment apiCallsInProgress attribute ${ActionType.API_CALL_BEGIN}`, () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: "",
      apiCallsInProgress: 0
    };
    const action = { type: ActionType.API_CALL_BEGIN };
    const newState = apiReducer(initialState, action);

    expect(newState.apiCallsInProgress).toEqual(1);
  });

  it(`should decrement apiCallsInProgress attribute ${ActionType.API_CALL_ERROR}`, () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: "",
      apiCallsInProgress: 1
    };
    const action = { type: ActionType.API_CALL_ERROR };
    const newState = apiReducer(initialState, action);

    expect(newState.apiCallsInProgress).toEqual(0);
  });

});
