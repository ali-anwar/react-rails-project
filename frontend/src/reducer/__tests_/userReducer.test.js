import userReducer from '../userReducer';
import * as UserActions from '../../action/UserActions';
import * as ActionType from '../../action/ActionType';

describe('userReducer.test.js', ()  => {

  it('has a default state', () => {
    const initialState = undefined;
    const action = { type: 'blah blah' };
    const newState = userReducer(initialState, action);
    const expectedState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };

    expect(newState).toEqual(expectedState);
  });

  it(`should get empty users when passed ${ActionType.GET_USERS}`, () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };
    const action = UserActions.getUsers;
    const newState = userReducer(initialState, action);

    expect(newState.users.length).toEqual(0);
    expect(newState.loading).toEqual(true)
  });

  it(`should get all users when passed ${ActionType.GET_USERS_SUCCESS}`, () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };
    const users = [{
      id: 'cory-house',
      firstName: 'Cory',
      lastName: 'House'
    }];
    const action = UserActions.getUsersSuccess(users);
    const newState = userReducer(initialState, action);

    expect(newState.users.length).toEqual(1);
    expect(newState.users[0].id).toEqual(users[0].id);
  });

  it(`should get error when passed ${ActionType.GET_USERS_FAILURE}`, () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };
    const error = new Error("An error occurred.");
    const action = UserActions.getUsersFailure(error);
    const newState = userReducer(initialState, action);

    expect(newState.error).toEqual(error);
  });

  it(`should show loading=true when passed ${ActionType.DELETE_USER}`, () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };
    const action = UserActions.deleteUser;
    const newState = userReducer(initialState, action);

    expect(newState.loading).toEqual(true)
  });

  it(`should delete user when passed ${ActionType.DELETE_USER_SUCCESS}`, () => {
    const initialState = {
      currentUser: null,
      user: {},
      loading: false,
      error: false,
      selectedUserId: "",
      users: [{
        id: 'cory-house',
        firstName: 'Cory',
        lastName: 'House'
      }]
    };
    const action = UserActions.deleteUserSuccess('cory-house');
    const newState = userReducer(initialState, action);

    expect(newState.users.length).toEqual(0);
  });

  it(`should set selected user when passed ${ActionType.SET_SELECTED_USER}`, () => {
    const user  = {
      id: 'cory-house',
      firstName: 'Cory',
      lastName: 'House'
    };
    const initialState = {
      currentUser: null,
      user: {},
      loading: false,
      error: false,
      selectedUserId: "",
      users: [user]
    };
    const action = UserActions.setSelectedUser('cory-house');
    const newState = userReducer(initialState, action);

    expect(newState.selectedUserId).toEqual(user.id);
  });

  it(`should show loading=true when passed ${ActionType.GET_USER}`, () => {
    const user  = {
      id: 'cory-house',
      firstName: 'Cory',
      lastName: 'House'
    };
    const initialState = {
      currentUser: null,
      users: [user],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };
    const action = UserActions.getUser('cory-house');
    const newState = userReducer(initialState, action);

    expect(newState.loading).toEqual(true)
  });

  it(`should get user when passed ${ActionType.GET_USER_SUCCESS}`, () => {
    const user  = {
      id: 'cory-house',
      firstName: 'Cory',
      lastName: 'House'
    };
    const initialState = {
      currentUser: null,
      users: [],
      loading: false,
      error: false,
      selectedUserId: "",
      user: user
    };
    const action = UserActions.getUserSuccess(user);
    const newState = userReducer(initialState, action);

    expect(newState.user).toEqual(user);
  });

  it(`should get error when passed ${ActionType.GET_USER_FAILURE}`, () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };
    const error = new Error("An error occurred.");
    const action = UserActions.getUserFailure(error);
    const newState = userReducer(initialState, action);

    expect(newState.error).toEqual(error);
  });

  it(`should show loading=true when passed ${ActionType.UPDATE_USER}`, () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };
    const action = UserActions.updateUser;
    const newState = userReducer(initialState, action);

    expect(newState.loading).toEqual(true)
  });

  it(`should update user when passed ${ActionType.UPDATE_USER_SUCCESS}`, () => {
    const user = {
      id: 'cory-house',
      firstName: 'Cory',
      lastName: 'House'
    };
    const initialState = {
      currentUser: null,
      users: [],
      loading: false,
      error: false,
      selectedUserId: "",
      user: {
        id: 'cory-house',
        firstName: 'Cory',
        lastName: 'House'
      }
    };
    const action = UserActions.updateUserSuccess(user);
    const newState = userReducer(initialState, action);

    expect(newState.user.title).toEqual(user.title);
  });

  it(`should get error when passed ${ActionType.UPDATE_USER_FAILURE}`, () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };
    const error = new Error("An error occurred.");
    const action = UserActions.updateUserFailure(error);
    const newState = userReducer(initialState, action);

    expect(newState.error).toEqual(error);
  });

  it(`should show loading=true when passed ${ActionType.CREATE_USER}`, () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };
    const action = UserActions.createUser;
    const newState = userReducer(initialState, action);

    expect(newState.loading).toEqual(true)
  });

  it(`should update user when passed ${ActionType.CREATE_USER_SUCCESS}`, () => {
    const user = {
      id: 'cory-house',
      firstName: 'Cory',
      lastName: 'House'
    };
    const initialState = {
      currentUser: null,
      loading: false,
      error: false,
      selectedUserId: "",
      user: {
        id: 'cory-house',
        firstName: 'Cory',
        lastName: 'House'
      },
      users: []
    };
    const action = UserActions.createUserSuccess(user);
    const newState = userReducer(initialState, action);

    expect(newState.user.title).toEqual(user.title);
  });

  it(`should get error when passed ${ActionType.CREATE_USER_FAILURE}`, () => {
    const initialState = {
      currentUser: null,
      users: [],
      user: {},
      loading: false,
      error: false,
      selectedUserId: ""
    };
    const error = new Error("An error occurred.");
    const action = UserActions.createUserFailure(error);
    const newState = userReducer(initialState, action);

    expect(newState.error).toEqual(error);
  });
});
