import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { signIn, signUp, populateUserState } from '../AuthActions';
import * as ActionType from '../ActionType';

jest.mock('../../lib/api');
import API from '../../lib/api';

describe('AuthActions.test.js', () => {

  const user = {
    id: 'cory-house',
    firstName: 'Cory',
    lastName: 'House'
  };

  const thunkMiddleware = [thunk];
  const mockStore = configureMockStore(thunkMiddleware);


  describe('signIn Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should signIn user', (done) => {

      const mockedResponse = {
        ok: true,
        json: () => {
          return user;
        },
        headers: {
          get: (type) => {
            if(type === 'Authorization') {
              return 'efkbidbuevbduevfuevuegfeuvvef';
            }
          }
        }
      };
      
      API.post.mockReturnValue(Promise.resolve(mockedResponse));
      const store = mockStore({ users: [] });

      store.dispatch(signIn({ email: 'johndoe', password: '123456' }))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(ActionType.API_CALL_BEGIN);
        expect(actions[1].type).toEqual(ActionType.API_CALL_ERROR);
        expect(actions[2].type).toEqual(ActionType.POPULATE_USER);
        expect(actions[2].user).toEqual(user);
        done();
      });
    });
  });

  describe('signIn Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should signUp user', (done) => {

      const mockedResponse = {
        ok: true,
        json: () => {
          return user;
        },
        headers: {
          get: (type) => {
            if(type === 'Authorization') {
              return 'efkbidbuevbduevfuevuegfeuvvef';
            }
          }
        }
      };
      
      API.post.mockReturnValue(Promise.resolve(mockedResponse));
      const store = mockStore({ users: [] });

      store.dispatch(signUp({
        name: 'John Doe',
        email: 'johndoe',
        calories: 100,
        role: 'user',
        password: '123456',
        password_confirmation: '123456'
      }))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(ActionType.API_CALL_BEGIN);
        expect(actions[1].type).toEqual(ActionType.API_CALL_ERROR);
        expect(actions[2].type).toEqual(ActionType.POPULATE_USER);
        expect(actions[2].user).toEqual(user);
        done();
      });
    });
  });
});
