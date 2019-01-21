# frozen_string_literal: true

class Api::V1::MealsController < ApplicationController
  before_action :set_meal, only: %i[update destroy]

  def index
    meals = policy_scope(Meal).includes(:user)
    render json: meals
  end

  def create
    meal = Meal.new(meal_params)
    meal.user = current_user unless current_user.admin?
    authorize meal
    meal.save
    render_resource(meal)
  end

  def update
    @meal.update_attributes(meal_params)
    render_resource(@meal)
  end

  def destroy
    @meal.destroy
  end

  private

  def set_meal
    @meal = Meal.find(params[:id])
    authorize @meal
  end

  def meal_params
    permit_params = %i[text no_of_calories date time user_id]
    params.require(:meal).permit(permit_params)
  end
end
