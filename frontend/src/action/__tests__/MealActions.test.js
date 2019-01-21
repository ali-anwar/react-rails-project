import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as MealActions from '../MealActions';
import * as ActionType from '../ActionType';

jest.mock('../../lib/requestWrapper');
jest.mock('../../lib/api');
import { makeRequest } from '../../lib/requestWrapper';
import API from '../../lib/api';

describe('MealActions.test.js', () => {

  const currentUser = {
    id: 'cory-house',
    firstName: 'Cory',
    lastName: 'House'
  };

  const tasty_meal = {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    calories: 100,
    description: "Very Tasty"
  };

  describe('getMealsSuccessAction Creator', () => {
    it(`should create action ${ActionType.GET_MEALS_SUCCESS}`, () => {
      const meals = [{
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        calories: 100,
        description: "Very Tasty"
      }];

      const expectedAction = {
        type: ActionType.GET_MEALS_SUCCESS,
        meals: meals
      };

      const actualAction = MealActions.getMealsSuccess(meals);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('getMealsFailureAction Creator', () => {
    it(`should create action ${ActionType.GET_MEALS_FAILURE}`, () => {
      const error = new Error();

      const expectedAction = {
        type: ActionType.GET_MEALS_FAILURE,
        error: error
      };

      const actualAction = MealActions.getMealsFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('deleteMealSuccessAction Creator', () => {
    it(`should create action ${ActionType.GET_MEALS_SUCCESS}`, () => {

      const expectedAction = {
        type: ActionType.DELETE_MEAL_SUCCESS,
        mealId: 12
      };

      const actualAction = MealActions.deleteMealSuccess(12);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('deleteMealFailureAction Creator', () => {
    it(`should create action ${ActionType.DELETE_MEAL_FAILURE}`, () => {
      const error = new Error()

      const expectedAction = {
        type: ActionType.DELETE_MEAL_FAILURE,
        error
      };

      const actualAction = MealActions.deleteMealFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('setSelectedMealAction Creator', () => {
    it(`should create action ${ActionType.SET_SELECTED_MEAL}`, () => {

      const expectedAction = {
        type: ActionType.SET_SELECTED_MEAL,
        mealId: 12
      };

      const actualAction = MealActions.setSelectedMeal(12);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('getMealSuccessAction Creator', () => {
    it(`should create action ${ActionType.GET_MEAL_SUCCESS}`, () => {
      const meal = {
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        calories: 100,
        description: "Very Tasty"
      };

      const expectedAction = {
        type: ActionType.GET_MEAL_SUCCESS,
        meal: meal
      };

      const actualAction = MealActions.getMealSuccess(meal);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('getMealFailureAction Creator', () => {
    it(`should create action ${ActionType.GET_MEAL_FAILURE}`, () => {
      const error = new Error();

      const expectedAction = {
        type: ActionType.GET_MEAL_FAILURE,
        error: error
      };

      const actualAction = MealActions.getMealFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('resetSelectedMealAction Creator', () => {
    it(`should create action ${ActionType.RESET_SELECTED_MEAL}`, () => {

      const expectedAction = {
        type: ActionType.RESET_SELECTED_MEAL
      };

      const actualAction = MealActions.resetSelectedMeal;

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('updateMealSuccessAction Creator', () => {
    it(`should create action ${ActionType.UPDATE_MEAL_SUCCESS}`, () => {
      const meal = {
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        calories: 100,
        description: "Very Tasty"
      };

      const expectedAction = {
        type: ActionType.UPDATE_MEAL_SUCCESS,
        meal: meal
      };

      const actualAction = MealActions.updateMealSuccess(meal);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('updateMealFailureAction Creator', () => {
    it(`should create action ${ActionType.UPDATE_MEAL_FAILURE}`, () => {
      const error = new Error();

      const expectedAction = {
        type: ActionType.UPDATE_MEAL_FAILURE,
        error: error
      };

      const actualAction = MealActions.updateMealFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('createMealSuccessAction Creator', () => {
    it(`should create action ${ActionType.CREATE_MEAL_SUCCESS}`, () => {
      const meal = {
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        calories: 100,
        description: "Very Tasty"
      };

      const expectedAction = {
        type: ActionType.CREATE_MEAL_SUCCESS,
        meal: meal
      };

      const actualAction = MealActions.createMealSuccess(meal);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('createMealFailureAction Creator', () => {
    it(`should create action ${ActionType.CREATE_MEAL_FAILURE}`, () => {
      const error = new Error();

      const expectedAction = {
        type: ActionType.CREATE_MEAL_FAILURE,
        error: error
      };

      const actualAction = MealActions.createMealFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });


  const thunkMiddleware = [thunk];
  const mockStore = configureMockStore(thunkMiddleware);


  describe('getMealsAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should get all meals', (done) => {
      
      API.get.mockReturnValue(true);
      makeRequest.mockReturnValue(Promise.resolve([tasty_meal]));
      const store = mockStore({ meals: [] });

      store.dispatch(MealActions.getMealsAction(currentUser))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(ActionType.GET_MEALS);
        expect(actions[1].type).toEqual(ActionType.GET_MEALS_SUCCESS);
        expect(actions[1].meals.length).toEqual(1);
        expect(actions[1].meals[0]).toEqual(tasty_meal);
        done();
      });
    });
  });

  describe('deleteMealAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should delete meal by id', (done) => {

      API.delete.mockReturnValue(true);
      makeRequest.mockReturnValue(Promise.resolve(true));
      const store = mockStore({ meals: [tasty_meal] });

      store.dispatch(MealActions.deleteMealAction(tasty_meal.id, currentUser))
      .then(() => {
        const action = store.getActions();

        expect(action.type).toEqual(ActionType.DELETE_MEALS_SUCCESS);
        done();
      });
    });
  });

  describe('setSelectedMealAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should set selected meal', (done) => {
      const expectedAction = {
        type: ActionType.SET_SELECTED_MEAL,
        mealId: tasty_meal.id
      };

      const store = mockStore({ meals: [] }, expectedAction, done);
      store.dispatch(MealActions.setSelectedMealAction(tasty_meal.id));
      const actions = store.getActions();

      expect(actions[0].type).toEqual(ActionType.SET_SELECTED_MEAL);
      done();
    });
  });

  describe('getMealAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should get a meal', (done) => {

      const store = mockStore({ meals: [tasty_meal] });
      store.dispatch(MealActions.getMealAction(tasty_meal.id, currentUser));
      const actions = store.getActions();

      expect(actions[0].type).toEqual(ActionType.GET_MEAL);
      expect(actions[0].mealId).toEqual(tasty_meal.id);
      done();
    });
  });

  describe('resetMealAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should reset selected meal', (done) => {

      const store = mockStore({ meals: [] });
      store.dispatch(MealActions.resetMealAction());
      const actions = store.getActions();

      expect(actions[0].type).toEqual(ActionType.RESET_SELECTED_MEAL);
      done();
    });
  });

  describe('updateMealAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should update a meal', (done) => {
      const updated_meal = {
        id: "react-flux-building-applications",
        title: "Updated title",
        calories: 100,
        description: "Very Tasty"
      }

      API.put.mockReturnValue(true);
      makeRequest.mockReturnValue(Promise.resolve(updated_meal));
      const store = mockStore({ meals: [tasty_meal] });

      store.dispatch(MealActions.updateMealAction(updated_meal, currentUser))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(ActionType.UPDATE_MEAL);
        expect(actions[1].type).toEqual(ActionType.UPDATE_MEAL_SUCCESS);
        expect(actions[1].meal).toEqual(updated_meal);
        done();
      });
    });
  });

  describe('createMealAction Thunk', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should create a meal', (done) => {
      const new_meal = {
        id: "react-flux-building-applications",
        title: "New title",
        calories: 100,
        description: "Very Tasty"
      }

      API.post.mockReturnValue(true);
      makeRequest.mockReturnValue(Promise.resolve(new_meal));
      const store = mockStore({ meals: [tasty_meal] });

      store.dispatch(MealActions.createMealAction(new_meal, currentUser))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(ActionType.CREATE_MEAL);
        expect(actions[1].type).toEqual(ActionType.CREATE_MEAL_SUCCESS);
        expect(actions[1].meal).toEqual(new_meal);
        done();
      });
    });
  });
});
