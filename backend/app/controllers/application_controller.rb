# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ApiConcerns
  include ActionController::MimeResponds
  include Pundit

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit :sign_up, keys: %i[name]
  end
end
