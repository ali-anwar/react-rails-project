# frozen_string_literal: true

module ApiConcerns
  extend ActiveSupport::Concern

  def render_resource(resource)
    if resource.errors.empty?
      render json: resource
    else
      unprocessable_entity(resource.errors)
    end
  end

  def record_not_found(exception)
    render json: {
      errors:
        {
          'status': 404,
          'message': exception
        }
    }, status: 404
  end

  def not_authenticated(message = nil)
    render json: {
      errors:
        {
          'status': 401,
          'message': message || 'Please login to perform this action'
        }
    }, status: 401
  end

  def unprocessable_entity(message = nil)
    render json: {
      errors:
        {
          'status': 422,
          'message': message.full_messages || 'Unprocessable Entity'
        }
    }, status: 422
  end

  def not_authorized
    render json: {
      errors:
        {
          'status': 403,
          'message': 'You are not authorized to perform this action'
        }
    }, status: 403
  end
end
