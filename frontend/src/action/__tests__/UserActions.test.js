import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as UserActions from '../UserActions';
import * as ActionType from '../ActionType';

jest.mock('../../lib/requestWrapper');
jest.mock('../../lib/api');
import { makeRequest } from '../../lib/requestWrapper';
import API from '../../lib/api';

describe('UserActions.test.js', () => {

  const currentUser = {
    id: 'cory-house',
    firstName: 'Cory',
    lastName: 'House'
  };

  describe('getUsersSuccessAction Creator', () => {
    it(`should create action ${ActionType.GET_USERS_SUCCESS}`, () => {
      const users = [{
        id: 'cory-house',
        firstName: 'Cory',
        lastName: 'House'
      }];

      const expectedAction = {
        type: ActionType.GET_USERS_SUCCESS,
        users: users
      };

      const actualAction = UserActions.getUsersSuccess(users);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('getUsersFailureAction Creator', () => {
    it(`should create action ${ActionType.GET_USERS_FAILURE}`, () => {
      const error = new Error();

      const expectedAction = {
        type: ActionType.GET_USERS_FAILURE,
        error: error
      };

      const actualAction = UserActions.getUsersFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('deleteUserSuccessAction Creator', () => {
    it(`should create action ${ActionType.GET_USERS_SUCCESS}`, () => {

      const expectedAction = {
        type: ActionType.DELETE_USER_SUCCESS,
        userId: 12
      };

      const actualAction = UserActions.deleteUserSuccess(12);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('deleteUserFailureAction Creator', () => {
    it(`should create action ${ActionType.DELETE_USER_FAILURE}`, () => {

      const error = new Error();
      const expectedAction = {
        type: ActionType.DELETE_USER_FAILURE,
        error
      };

      const actualAction = UserActions.deleteUserFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('setSelectedUserAction Creator', () => {
    it(`should create action ${ActionType.SET_SELECTED_USER}`, () => {

      const expectedAction = {
        type: ActionType.SET_SELECTED_USER,
        userId: 12
      };

      const actualAction = UserActions.setSelectedUser(12);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('getUserSuccessAction Creator', () => {
    it(`should create action ${ActionType.GET_USER_SUCCESS}`, () => {
      const user = {
        id: 'cory-house',
        firstName: 'Cory',
        lastName: 'House'
      };

      const expectedAction = {
        type: ActionType.GET_USER_SUCCESS,
        user: user
      };

      const actualAction = UserActions.getUserSuccess(user);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('getUserFailureAction Creator', () => {
    it(`should create action ${ActionType.GET_USER_FAILURE}`, () => {
      const error = new Error();

      const expectedAction = {
        type: ActionType.GET_USER_FAILURE,
        error: error
      };

      const actualAction = UserActions.getUserFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('resetSelectedUserAction Creator', () => {
    it(`should create action ${ActionType.RESET_SELECTED_USER}`, () => {

      const expectedAction = {
        type: ActionType.RESET_SELECTED_USER
      };

      const actualAction = UserActions.resetSelectedUser;

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('updateUserSuccessAction Creator', () => {
    it(`should create action ${ActionType.UPDATE_USER_SUCCESS}`, () => {
      const user = {
        id: 'cory-house',
        firstName: 'Cory',
        lastName: 'House'
      };

      const expectedAction = {
        type: ActionType.UPDATE_USER_SUCCESS,
        user: user
      };

      const actualAction = UserActions.updateUserSuccess(user);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('updateUserFailureAction Creator', () => {
    it(`should create action ${ActionType.UPDATE_USER_FAILURE}`, () => {
      const error = new Error();

      const expectedAction = {
        type: ActionType.UPDATE_USER_FAILURE,
        error: error
      };

      const actualAction = UserActions.updateUserFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('createUserSuccessAction Creator', () => {
    it(`should create action ${ActionType.CREATE_USER_SUCCESS}`, () => {
      const user = {
        id: 'cory-house',
        firstName: 'Cory',
        lastName: 'House'
      };

      const expectedAction = {
        type: ActionType.CREATE_USER_SUCCESS,
        user: user
      };

      const actualAction = UserActions.createUserSuccess(user);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('createUserFailureAction Creator', () => {
    it(`should create action ${ActionType.CREATE_USER_FAILURE}`, () => {
      const error = new Error();

      const expectedAction = {
        type: ActionType.CREATE_USER_FAILURE,
        error: error
      };

      const actualAction = UserActions.createUserFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });


  const thunkMiddleware = [thunk];
  const mockStore = configureMockStore(thunkMiddleware);


  describe('getUsersAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should get all users', (done) => {
      
      API.get.mockReturnValue(true);
      makeRequest.mockReturnValue(Promise.resolve([currentUser]));
      const store = mockStore({ users: [] });

      store.dispatch(UserActions.getUsersAction(currentUser))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(ActionType.GET_USERS);
        expect(actions[1].type).toEqual(ActionType.GET_USERS_SUCCESS);
        expect(actions[1].users.length).toEqual(1);
        expect(actions[1].users[0]).toEqual(currentUser);
        done();
      });
    });
  });

  describe('deleteUserAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should delete user by id', (done) => {
      const user = Object.assign(currentUser, { id: 'test-user' })

      API.delete.mockReturnValue(true);
      makeRequest.mockReturnValue(Promise.resolve(true));
      const store = mockStore({ users: [user] });

      store.dispatch(UserActions.deleteUserAction(user.id, currentUser))
      .then(() => {
        const action = store.getActions();

        expect(action[0].type).toEqual(ActionType.DELETE_USER);
        expect(action[1].type).toEqual(ActionType.DELETE_USER_SUCCESS);
        expect(action[1].userId).toEqual(user.id);
        done();
      });
    });
  });

  describe('setSelectedUserAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should set selected user', (done) => {
      const expectedAction = {
        type: ActionType.SET_SELECTED_USER,
        userId: 12
      };

      const store = mockStore({ users: [currentUser] });
      store.dispatch(UserActions.setSelectedUserAction(currentUser.id));
      const actions = store.getActions();

      expect(actions[0].type).toEqual(ActionType.SET_SELECTED_USER);
      expect(actions[0].userId).toEqual(currentUser.id);
      done();
    });
  });

  describe('getUserAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should get a user', (done) => {

      API.get.mockReturnValue(true);
      makeRequest.mockReturnValue(Promise.resolve(currentUser));
      const store = mockStore({ users: [currentUser] });

      store.dispatch(UserActions.getUserAction(currentUser.id))
      const actions = store.getActions();

      expect(actions[0].type).toEqual(ActionType.GET_USER);
      expect(actions[0].userId).toEqual(currentUser.id);
      done();
    });
  });

  describe('resetUserAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should reset selected user', (done) => {
      
      const store = mockStore({ users: [] });
      store.dispatch(UserActions.resetUserAction());
      const actions = store.getActions();

      expect(actions[0].type).toEqual(ActionType.RESET_SELECTED_USER);
      done();
    });
  });

  describe('updateUserAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should update a user', (done) => {
      const user = Object.assign(currentUser, { firstName: 'John' })
      const store = mockStore({ users: [user, currentUser] });

      API.put.mockReturnValue(true);
      makeRequest.mockReturnValue(Promise.resolve(user));

      store.dispatch(UserActions.updateUserAction(user, currentUser))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(ActionType.UPDATE_USER);
        expect(actions[1].type).toEqual(ActionType.UPDATE_USER_SUCCESS);
        expect(actions[1].user).toEqual(user);
        done();
      });
    });
  });

  describe('createUserAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should create a user', (done) => {
      const user = Object.assign(currentUser, { id: 'test-user' })
      const store = mockStore({ users: [currentUser] });

      API.post.mockReturnValue(true);
      makeRequest.mockReturnValue(Promise.resolve(user));

      store.dispatch(UserActions.createUserAction(user, currentUser))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(ActionType.CREATE_USER);
        expect(actions[1].type).toEqual(ActionType.CREATE_USER_SUCCESS);
        expect(actions[1].user).toEqual(user);
        done();
      });
    });
  });
});
