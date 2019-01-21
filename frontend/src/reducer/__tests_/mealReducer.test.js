import mealReducer from '../mealReducer';
import * as MealActions from '../../action/MealActions';
import * as ActionType from '../../action/ActionType';

describe('mealReducer.test.js', ()  => {

  it('has a default state', () => {
    const initialState = undefined;
    const action = { type: 'blah blah' };
    const newState = mealReducer(initialState, action);
    const expectedState = {
      error: false,
      filterEndDate: null,
      filterEndTime: "",
      filterErrorMessage: null,
      filterStartDate: null,
      filterStartTime: "",
      filteredMeals: [],
      loading: false,
      meal: {},
      meals: [],
      selectedMealId: ""
    };

    expect(newState).toEqual(expectedState);
  });

  it(`should get empty meals when passed ${ActionType.GET_MEALS}`, () => {
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {}
    };
    const action = MealActions.getMeals;
    const newState = mealReducer(initialState, action);

    expect(newState.meals.length).toEqual(0);
    expect(newState.loading).toEqual(true)
  });

  it(`should get all meals when passed ${ActionType.GET_MEALS_SUCCESS}`, () => {
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {},
      meals: []
    };
    const meals = [{
      id: "react-flux-building-applications",
      title: "Building Applications in React and Flux",
      calories: 100,
      description: "Very Tasty"
    }];
    const action = MealActions.getMealsSuccess(meals);
    const newState = mealReducer(initialState, action);

    expect(newState.meals.length).toEqual(1);
    expect(newState.meals[0].id).toEqual("react-flux-building-applications");
  });

  it(`should get error when passed ${ActionType.GET_MEALS_FAILURE}`, () => {
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {},
      meals: []
    };
    const error = new Error("An error occurred.");
    const action = MealActions.getMealsFailure(error);
    const newState = mealReducer(initialState, action);

    expect(newState.error).toEqual(error);
  });

  it(`should show loading=true when passed ${ActionType.DELETE_MEAL}`, () => {
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {}
    };
    const action = MealActions.deleteMeal;
    const newState = mealReducer(initialState, action);

    expect(newState.loading).toEqual(true)
  });

  it(`should delete meal when passed ${ActionType.DELETE_MEAL_SUCCESS}`, () => {
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {},
      meals: [{
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        calories: 100,
        description: "Very Tasty"
      }]
    };
    const action = MealActions.deleteMealSuccess("react-flux-building-applications");
    const newState = mealReducer(initialState, action);

    expect(newState.meals.length).toEqual(0);
  });

  it(`should set selected meal when passed ${ActionType.SET_SELECTED_MEAL}`, () => {
    const meal  = {
      id: "react-flux-building-applications",
      title: "Building Applications in React and Flux",
      calories: 100,
      description: "Very Tasty"
    };
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {},
      meals: [meal]
    };
    const action = MealActions.setSelectedMeal("react-flux-building-applications");
    const newState = mealReducer(initialState, action);

    expect(newState.selectedMealId).toEqual(meal.id);
  });

  it(`should show loading=true when passed ${ActionType.GET_MEAL}`, () => {
    const meal  = {
      id: "react-flux-building-applications",
      title: "Building Applications in React and Flux",
      calories: 100,
      description: "Very Tasty"
    };
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {},
      meals: [meal]
    };
    const action = MealActions.getMeal(12);
    const newState = mealReducer(initialState, action);

    expect(newState.loading).toEqual(true)
  });

  it(`should get meal when passed ${ActionType.GET_MEAL_SUCCESS}`, () => {
    const meal = {
      id: "react-flux-building-applications",
      title: "Building Applications in React and Flux",
      calories: 100,
      description: "Very Tasty"
    };
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: meal,
      meals: []
    };
    const action = MealActions.getMealSuccess(meal);
    const newState = mealReducer(initialState, action);

    expect(newState.meal).toEqual(meal);
  });

  it(`should get error when passed ${ActionType.GET_MEAL_FAILURE}`, () => {
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {},
      meals: []
    };
    const error = new Error("An error occurred.");
    const action = MealActions.getMealFailure(error);
    const newState = mealReducer(initialState, action);

    expect(newState.error).toEqual(error);
  });

  it(`should show loading=true when passed ${ActionType.UPDATE_MEAL}`, () => {
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {}
    };
    const action = MealActions.updateMeal;
    const newState = mealReducer(initialState, action);

    expect(newState.loading).toEqual(true)
  });

  it(`should update meal when passed ${ActionType.UPDATE_MEAL_SUCCESS}`, () => {
    const meal = {
      id: "react-flux-building-applications",
      title: "Building Applications in React and Flux",
      calories: 100,
      description: "Very Tasty"
    };
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        calories: 100,
        description: "Very Tasty"
      },
      meals: []
    };
    const action = MealActions.updateMealSuccess(meal);
    const newState = mealReducer(initialState, action);

    expect(newState.meal.title).toEqual(meal.title);
  });

  it(`should get error when passed ${ActionType.UPDATE_MEAL_FAILURE}`, () => {
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {},
      meals: []
    };
    const error = new Error("An error occurred.");
    const action = MealActions.updateMealFailure(error);
    const newState = mealReducer(initialState, action);

    expect(newState.error).toEqual(error);
  });

  it(`should show loading=true when passed ${ActionType.CREATE_MEAL}`, () => {
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {}
    };
    const action = MealActions.createMeal;
    const newState = mealReducer(initialState, action);

    expect(newState.loading).toEqual(true)
  });

  it(`should update meal when passed ${ActionType.CREATE_MEAL_SUCCESS}`, () => {
    const meal = {
      id: "react-flux-building-applications",
      title: "Building Applications in React and Flux",
      calories: 100,
      description: "Very Tasty"
    };
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        calories: 100,
        description: "Very Tasty"
      },
      meals: []
    };
    const action = MealActions.createMealSuccess(meal);
    const newState = mealReducer(initialState, action);

    expect(newState.meal.title).toEqual(meal.title);
  });

  it(`should get error when passed ${ActionType.CREATE_MEAL_FAILURE}`, () => {
    const initialState = {
      error: false,
      loading: false,
      selectedMealId: "",
      meal: {},
      meals: []
    };
    const error = new Error("An error occurred.");
    const action = MealActions.createMealFailure(error);
    const newState = mealReducer(initialState, action);

    expect(newState.error).toEqual(error);
  });
});
