# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]

  def index
    authorize User
    render json: User.all
  end

  def show
    render json: @user
  end

  def create
    user = User.new(user_params)
    user.set_password

    authorize user
    user.save
    render_resource(user)
  end

  def update
    @user.update_attributes(user_params)
    render_resource(@user)
  end

  def destroy
    @user.destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
    authorize @user
  end

  def user_params
    permit_params = %i[name email role calories]
    params.require(:user).permit(permit_params)
  end
end
