import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import apiReducer from './apiReducer';
import mealReducer from './mealReducer';
import userReducer from './userReducer';

export default combineReducers({
  apiReducer,
  mealReducer,
  userReducer,
  form: formReducer
});
