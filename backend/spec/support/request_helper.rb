# frozen_string_literal: true

module Requests
  module JsonHelpers
    def json
      JSON.parse(response.body)
    end
  end

  module RequestHelpers
    def request_headers(extra_headers = {})
      {
        'ACCEPT' => 'application/json'
      }.merge(extra_headers)
    end
  end

  module AuthenticationHelpers
    def login_in_with(user)
      post '/users/sign_in', params: login_in_params(user), headers: {
        'ACCEPT' => 'application/json'
      }

      response
    end

    def login_in_params(user)
      {
        'user': {
          'email' => user[:email],
          'password' => user[:password]
        }
      }.as_json
    end
  end
end

RSpec.configure do |config|
  config.include Requests::JsonHelpers, type: :request
  config.include Requests::RequestHelpers, type: :request
  config.include Requests::AuthenticationHelpers, type: :request
end
