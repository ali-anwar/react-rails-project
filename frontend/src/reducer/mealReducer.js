import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';
const DEFAULT_START_TIME = '00:00';
const DEFAULT_END_TIME = '23:59';
const DEFAULT_DATE_FORMAT = 'YYYY/MM/DD';

const mealReducer = (state = initialState.mealReducer, action) => {
  switch (action.type) {
    case ActionType.GET_MEALS: {
      return {
        ...state,
        meals: _.assign([]),
        loading: true,
        error: false,
        filterErrorMessage: null,
        filterStartDate: null,
        filterEndDate: null,
        filterStartTime: '',
        filterEndTime: ''
      };
    }
    case ActionType.GET_MEALS_SUCCESS: {
      return {
        ...state,
        meals: _.assign(action.meals),
        filteredMeals: _.assign(action.meals),
        loading: false,
        error: false
      };
    }
    case ActionType.GET_MEALS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        meals: _.assign([])
      };
    }
    case ActionType.DELETE_MEAL: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case ActionType.DELETE_MEAL_SUCCESS: {
      let updatedMeals = _.assign(
        state.meals.filter(meal => meal.id !== action.mealId)
      );

      return {
        ...state,
        loading: false,
        error: false,
        meals: updatedMeals,
        filteredMeals: updatedMeals
      };
    }
    case ActionType.DELETE_MEAL_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case ActionType.SET_SELECTED_MEAL: {
      return {
        ...state,
        selectedMealId: action.mealId
      };
    }
    case ActionType.GET_MEAL: {
      return {
        ...state,
        loading: true,
        error: false,
        meal: _.assign(state.meals.find(meal => meal.id === action.mealId))
      };
    }
    case ActionType.GET_MEAL_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        meal: _.assign(action.meal)
      };
    }
    case ActionType.GET_MEAL_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        meal: undefined
      };
    }
    case ActionType.RESET_SELECTED_MEAL: {
      return {
        ...state,
        meal: {}
      };
    }
    case ActionType.CREATE_MEAL: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case ActionType.CREATE_MEAL_SUCCESS: {
      let updatedMeals = _.assign(state.meals);
      updatedMeals.push(action.meal);

      return {
        ...state,
        meals: _.assign(updatedMeals),
        filteredMeals: _.assign(updatedMeals),
        loading: false,
        error: false,
        filterErrorMessage: null,
        filterStartDate: null,
        filterEndDate: null,
        filterStartTime: '',
        filterEndTime: ''
      };
    }
    case ActionType.CREATE_MEAL_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case ActionType.UPDATE_MEAL: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case ActionType.UPDATE_MEAL_SUCCESS: {
      let updatedMeals = _.assign(state.meals);
      const existingMealIndex = updatedMeals.findIndex(
        meal => meal.id === action.meal.id
      );
      updatedMeals.splice(existingMealIndex, 1, action.meal);

      return {
        ...state,
        meals: _.assign(updatedMeals),
        filteredMeals: _.assign(updatedMeals),
        loading: false,
        error: false,
        filterErrorMessage: null,
        filterStartDate: null,
        filterEndDate: null,
        filterStartTime: '',
        filterEndTime: ''
      };
    }
    case ActionType.UPDATE_MEAL_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case ActionType.FILTER_MEALS: {
      let startDateString = state.filterStartDate;
      let endDateString = state.filterEndDate;
      let startTimeString = state.filterStartTime
        ? state.filterStartTime
        : DEFAULT_START_TIME;
      let endTimeString = state.filterEndTime
        ? state.filterEndTime
        : DEFAULT_END_TIME;
      let endDateTime = null;
      let filteredMeals = [];

      if (!startDateString) {
        //   return {
        //     ...state,
        //     filterErrorMessage: 'Start date is required to filter results'
        //   }
      }

      startDateString = startDateString.format(DEFAULT_DATE_FORMAT);
      let startDateTime = new Date(`${startDateString} ${startTimeString}`);

      if (endDateString) {
        endDateString = endDateString.format(DEFAULT_DATE_FORMAT);
        endDateTime = new Date(`${endDateString} ${endTimeString}`);

        if (startDateTime > endDateTime) {
          // return {
          //   ...state,
          //   filterErrorMessage: 'Start Date & Time must be lesser than End Date & Time'
          // }
        } else {
          filteredMeals = state.meals.filter(meal => {
            let mealDateTime = new Date(`${meal.date} ${meal.time}`);
            return mealDateTime >= startDateTime && mealDateTime <= endDateTime;
          });
        }
      } else {
        filteredMeals = state.meals.filter(meal => {
          let mealDateTime = new Date(`${meal.date} ${meal.time}`);
          return mealDateTime >= startDateTime;
        });
      }

      return {
        ...state,
        filteredMeals: _.assign(filteredMeals),
        filterErrorMessage: null
      };
    }
    case ActionType.CLEAR_FILTER: {
      return {
        ...state,
        filteredMeals: _.assign(state.meals),
        filterErrorMessage: null,
        filterStartDate: null,
        filterEndDate: null,
        filterStartTime: '',
        filterEndTime: ''
      };
    }
    case ActionType.SET_FILTER_START_DATE: {
      return {
        ...state,
        filterStartDate: action.date,
        filterErrorMessage: null
      };
    }
    case ActionType.SET_FILTER_START_TIME: {
      return {
        ...state,
        filterStartTime: action.time,
        filterErrorMessage: null
      };
    }
    case ActionType.SET_FILTER_END_DATE: {
      return {
        ...state,
        filterEndDate: action.date,
        filterErrorMessage: null
      };
    }
    case ActionType.SET_FILTER_END_TIME: {
      return {
        ...state,
        filterEndTime: action.time,
        filterErrorMessage: null
      };
    }

    default: {
      return state;
    }
  }
};

export default mealReducer;
