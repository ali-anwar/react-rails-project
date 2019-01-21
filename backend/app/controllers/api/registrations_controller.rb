# frozen_string_literal: true

class Api::RegistrationsController < Devise::RegistrationsController
  def create
    build_resource(sign_up_params)
    resource.save_as_regular_user

    bypass_sign_in(resource)
    render_resource(resource)
  end
end
