export default {
  apiReducer: {
    apiCallsInProgress: 0
  },

  mealReducer: {
    meals: [],
    error: false,
    loading: false,
    selectedMealId: '',
    meal: {},
    filteredMeals: [],
    filterErrorMessage: null,
    filterStartDate: null,
    filterEndDate: null,
    filterStartTime: '',
    filterEndTime: ''
  },

  userReducer: {
    currentUser: null,
    users: [],
    user: {},
    loading: false,
    error: false,
    selectedUserId: ''
  }
};
