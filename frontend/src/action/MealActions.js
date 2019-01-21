import * as ActionType from './ActionType';
import API from '../lib/api';
import { makeRequest } from '../lib/requestWrapper';

export const getMeals = {
  type: ActionType.GET_MEALS
};

export const getMealsSuccess = meals => ({
  type: ActionType.GET_MEALS_SUCCESS,
  meals
});

export const getMealsFailure = error => ({
  type: ActionType.GET_MEALS_FAILURE,
  error
});

export const createMeal = {
  type: ActionType.CREATE_MEAL
};

export const createMealSuccess = meal => ({
  type: ActionType.CREATE_MEAL_SUCCESS,
  meal
});

export const createMealFailure = error => ({
  type: ActionType.CREATE_MEAL_FAILURE,
  error
});

export const deleteMeal = {
  type: ActionType.DELETE_MEAL
};

export const deleteMealSuccess = mealId => ({
  type: ActionType.DELETE_MEAL_SUCCESS,
  mealId
});

export const deleteMealFailure = error => ({
  type: ActionType.DELETE_MEAL_FAILURE,
  error
});

export const updateMeal = {
  type: ActionType.UPDATE_MEAL
};

export const updateMealSuccess = meal => ({
  type: ActionType.UPDATE_MEAL_SUCCESS,
  meal
});

export const updateMealFailure = error => ({
  type: ActionType.UPDATE_MEAL_FAILURE,
  error
});

export const setSelectedMeal = mealId => ({
  type: ActionType.SET_SELECTED_MEAL,
  mealId
});

export const getMeal = mealId => ({
  type: ActionType.GET_MEAL,
  mealId
});

export const getMealSuccess = meal => ({
  type: ActionType.GET_MEAL_SUCCESS,
  meal
});

export const getMealFailure = error => ({
  type: ActionType.GET_MEAL_FAILURE,
  error
});

export const resetSelectedMeal = {
  type: ActionType.RESET_SELECTED_MEAL
};

export const filterMeals = {
  type: ActionType.FILTER_MEALS
};

export const clearFilterMeals = {
  type: ActionType.CLEAR_FILTER
};

export const setFilterStartDate = date => ({
  type: ActionType.SET_FILTER_START_DATE,
  date
});

export const setFilterEndDate = date => ({
  type: ActionType.SET_FILTER_END_DATE,
  date
});

export const setFilterStartTime = time => ({
  type: ActionType.SET_FILTER_START_TIME,
  time
});

export const setFilterEndTime = time => ({
  type: ActionType.SET_FILTER_END_TIME,
  time
});

export function setSelectedMealAction(selectedMealId) {
  return dispatch => {
    dispatch(setSelectedMeal(selectedMealId));
  };
}

export function getMealAction(mealId, currentUser) {
  return dispatch => {
    dispatch(getMeal(mealId));
  };
}

export function resetMealAction() {
  return dispatch => {
    dispatch(resetSelectedMeal);
  };
}

export function filterMealsAction() {
  return dispatch => {
    dispatch(filterMeals);
  };
}

export function clearFilterMealsAction() {
  return dispatch => {
    dispatch(clearFilterMeals);
  };
}

export function setFilterStartDateAction(date) {
  return dispatch => {
    dispatch(setFilterStartDate(date));
  };
}

export function setFilterEndDateAction(date) {
  return dispatch => {
    dispatch(setFilterEndDate(date));
  };
}

export function setFilterStartTimeAction(time) {
  return dispatch => {
    dispatch(setFilterStartTime(time));
  };
}

export function setFilterEndTimeAction(time) {
  return dispatch => {
    dispatch(setFilterEndTime(time));
  };
}

export function getMealsAction(currentUser) {
  return dispatch => {
    dispatch(getMeals);

    return makeRequest(API.get(`/api/v1/meals`, currentUser.accessToken))
      .then(meals => {
        dispatch(getMealsSuccess(meals));
      })
      .catch(error => {
        dispatch(getMealsFailure(error));
        throw error;
      });
  };
}

export function deleteMealAction(selectedMealId, currentUser) {
  return dispatch => {
    dispatch(deleteMeal);

    return makeRequest(
      API.delete(
        `/api/v1/meals/${selectedMealId}`,
        null,
        currentUser.accessToken
      )
    )
      .then(() => {
        dispatch(deleteMealSuccess(selectedMealId));
      })
      .catch(error => {
        dispatch(deleteMealFailure(error));
        throw error;
      });
  };
}

export function updateMealAction(meal, currentUser) {
  return dispatch => {
    dispatch(updateMeal);

    return makeRequest(
      API.put(`/api/v1/meals/${meal.id}`, meal, currentUser.accessToken)
    )
      .then(meal => {
        dispatch(updateMealSuccess(meal));
      })
      .catch(error => {
        dispatch(updateMealFailure(error));
        throw error;
      });
  };
}

export function createMealAction(meal, currentUser) {
  return dispatch => {
    dispatch(createMeal);

    return makeRequest(API.post(`/api/v1/meals`, meal, currentUser.accessToken))
      .then(meal => {
        dispatch(createMealSuccess(meal));
      })
      .catch(error => {
        dispatch(createMealFailure(error));
        throw error;
      });
  };
}
