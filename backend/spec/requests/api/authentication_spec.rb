# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Authentication', type: :request do
  subject { create(:user, :regular) }

  describe 'POST /users/sign_in' do
    let(:url) { '/users/sign_in' }
    let(:params) do
      {
        user: {
          email: subject.email,
          password: subject.password
        }
      }
    end

    context 'when login params are correct' do
      before do
        post url, params: params
      end

      it 'returns 200 status' do
        expect(response).to have_http_status(200)
      end

      it 'returns JTW token in authorization header' do
        expect(response.headers['Authorization']).to be_present
      end

      it 'returns valid JWT token' do
        token_from_request = response.headers['Authorization'].split(' ').last
        decoded_token = JWT.decode(token_from_request, Rails.application.credentials.devise_jwt_secret_key, true)

        expect(decoded_token.first['sub']).to be_present
      end
    end

    context 'when login params are incorrect' do
      before { post url }

      it 'returns 401 status' do
        expect(response).to have_http_status(401)
      end
    end

    context 'DELETE /users/sign_out' do
      let(:url) { '/users/sign_out' }

      it 'returns 204, no content' do
        delete url
        expect(response).to have_http_status(204)
      end
    end
  end
end
