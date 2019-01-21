import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mealAction from '../../action/MealActions';
import MealList from './MealList';
import { ADMIN_ROLE } from '../../lib/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import toastr from 'toastr';
import { renderError } from '../../lib/errorMessageRenderer';
import Loader from 'react-loader-spinner';

export class MealListContainer extends React.Component {
  componentDidMount() {
    this.props.action.clearFilterMealsAction();
    this.props.action.getMealsAction(this.props.currentUser).catch(error => {
      renderError(error.errors.message);
    });
  }

  isCurrentAdminUser = () => {
    return this.props.currentUser.role === ADMIN_ROLE;
  };

  handleAddMeal = () => {
    this.props.action.resetMealAction();
    this.props.history.push('/meals/new');
  };

  handleEditMeal = id => {
    const selectedMealId = id;

    if (selectedMealId) {
      this.props.action.getMealAction(selectedMealId, this.props.currentUser);
      this.props.action.setSelectedMealAction(undefined);
      this.props.history.push(`/meal/${selectedMealId}`);
    }
  };

  handleDelete = id => {
    const selectedMealId = id;

    if (selectedMealId) {
      this.props.action.setSelectedMealAction(undefined);
      this.props.action
        .deleteMealAction(selectedMealId, this.props.currentUser)
        .then(() => {
          toastr.success('Meal has been deleted successfully!');
        })
        .catch(error => {
          renderError(error.errors.message);
        });
    }
  };

  handleRowSelect = (row, isSelected) => {
    if (isSelected) {
      this.props.action.setSelectedMealAction(row.id);
    }
  };

  setMealCaloriesLimit = meals => {
    let updatedMeals = meals.map(dayMeal => {
      let dayMeals = meals.filter(meal => meal.date === dayMeal.date);
      let dailyCalorieTotal = dayMeals.reduce((sum, currentMeal) => {
        return sum + currentMeal.no_of_calories;
      }, 0);
      dayMeal.exceedsCaloriesLimit =
        dailyCalorieTotal <= this.props.currentUser.calories ? false : true;
      if (
        this.props.currentUser.calories === null ||
        this.props.currentUser.calories === 0
      ) {
        dayMeal.noCaloriesLimit = true;
      }
      return dayMeal;
    });
    return updatedMeals;
  };

  setMealUserName = meals => {
    let updatedMeals = meals.map(meal => {
      let updatedMeal = meal;
      updatedMeal.userName = updatedMeal.user.name;
      return updatedMeal;
    });

    return updatedMeals;
  };

  handleFilterSubmit = e => {
    e.preventDefault();
    this.props.action.filterMealsAction();
  };

  handleClearFilterSubmit = () => {
    this.props.action.clearFilterMealsAction();
  };

  handleFilterEndDateChange = date => {
    this.props.action.setFilterEndDateAction(date);
    this.props.action.filterMealsAction();
  };

  handleFilterStartDateChange = date => {
    this.props.action.setFilterStartDateAction(date);
    this.props.action.filterMealsAction();
  };

  handleFilterStartTimeChange = e => {
    this.props.action.setFilterStartTimeAction(e.target.value);
    if (e.target.value !== '') {
      this.props.action.filterMealsAction();
    }
  };

  handleFilterEndTimeChange = e => {
    this.props.action.setFilterEndTimeAction(e.target.value);
    if (e.target.value !== '') {
      this.props.action.filterMealsAction();
    }
  };

  render() {
    let {
      filteredMeals,
      loading,
      error,
      filterErrorMessage,
      filterStartDate,
      filterEndDate,
      filterStartTime,
      filterEndTime
    } = this.props;

    if (loading) {
      return (
        <div className="loading-spinner">
          <Loader type="Oval" color="#00BFFF" height="50" width="50" />
        </div>
      );
    }

    if (error) {
      return <div>Failed to Load Meals, Please Try Again</div>;
    }

    if (filteredMeals) {
      filteredMeals = this.setMealCaloriesLimit(filteredMeals);
      filteredMeals = this.setMealUserName(filteredMeals);
    }

    if (filterErrorMessage) {
      toastr.warning(filterErrorMessage);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="mt-4 mb-4">
              <h1>Meals</h1>
            </div>
            <div className="row">
              <div className="col">
                <form className="form-inline">
                  <div className="form-group">
                    <label className="mr-sm-2 mb-2">Start Date</label>
                    <DatePicker
                      selected={
                        filterStartDate ? moment(filterStartDate) : null
                      }
                      autoComplete="off"
                      onChange={this.handleFilterStartDateChange}
                      className="form-control mb-2 mr-sm-2"
                      dateFormat="YYYY-MM-DD"
                      id="filterStartDate"
                    />
                  </div>

                  <div className="form-group">
                    <label className="mr-sm-2 mb-2">End Date</label>
                    <DatePicker
                      selected={
                        filterEndDate ? moment(filterEndDate) : null
                      }
                      onChange={this.handleFilterEndDateChange}
                      className="form-control mb-2 mr-sm-2"
                      dateFormat="YYYY-MM-DD"
                      autoComplete="off"
                      id="filterEndDate"
                    />
                  </div>

                  <div className="form-group">
                    <label className="mr-sm-2 mb-2">Start Time</label>
                    <input
                      type="time"
                      className="form-control mb-2 mr-sm-2"
                      value={filterStartTime}
                      onChange={this.handleFilterStartTimeChange}
                      id="filterStartTime"
                    />
                  </div>

                  <div className="form-group">
                    <label className="mr-sm-2 mb-2">End Time</label>
                    <input
                      type="time"
                      className="form-control mb-2 mr-sm-2"
                      value={filterEndTime}
                      onChange={this.handleFilterEndTimeChange}
                      id="filterEndTime"
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      id="filter"
                      className="btn btn-primary mb-2 mr-sm-2"
                    >
                      Filter
                    </button>
                    <button
                      type="reset"
                      className="btn btn-gray mb-2 clear-btn"
                      onClick={this.handleClearFilterSubmit}
                      id="reset"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col">
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleAddMeal}
              >
                <i className="fa fa-plus" aria-hidden="true" /> New
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <MealList
              meals={filteredMeals}
              handleRowSelect={this.handleRowSelect}
              isCurrentAdminUser={this.isCurrentAdminUser()}
              handleDeleteButton={this.handleDelete}
              handleEditButton={this.handleEditMeal}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meals: state.mealReducer.meals,
  loading: state.mealReducer.loading,
  error: state.mealReducer.error,
  selectedMealId: state.mealReducer.selectedMealId,
  currentUser: state.userReducer.currentUser,
  filteredMeals: state.mealReducer.filteredMeals,
  filterErrorMessage: state.mealReducer.filterErrorMessage,
  filterStartDate: state.mealReducer.filterStartDate,
  filterEndDate: state.mealReducer.filterEndDate,
  filterStartTime: state.mealReducer.filterStartTime,
  filterEndTime: state.mealReducer.filterEndTime
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(mealAction, dispatch)
});

MealListContainer.propTypes = {
  meals: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealListContainer);
