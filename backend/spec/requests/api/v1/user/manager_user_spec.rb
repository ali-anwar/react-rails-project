# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User', type: :request do
  let!(:manager_user) { create(:user, :manager) }
  let!(:regular_user) { create(:user, :regular) }

  let(:email) { Faker::Internet.email }

  let!(:manager_credentials) do
    {
      email: manager_user.email,
      password: manager_user.password
    }
  end

  let(:user_params) do
    {
      user: {
        name: Faker::Lorem.word,
        email: email,
        role: 'regular'
      }
    }
  end

  let(:user_invalid_params) do
    {
      user: {
        email: manager_user.email,
        role: :regular,
        calories: Faker::Lorem.word
      }
    }
  end

  before(:each) do
    @manager_session = login_in_with manager_credentials
  end

  describe 'GET /users' do
    context 'listing' do
      before(:each) do
        get '/api/v1/users', headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns listing' do
        expect(json.length).to be > 0
        expect(json.collect { |user| user['role'] }.include?(manager_user.role)).to be true
        expect(json.collect { |user| user['role'] }.include?(regular_user.role)).to be true
      end
    end
  end

  describe 'GET /users/:user_id' do
    context 'user_id is invalid' do
      let(:invalid_user_id) { Faker::Number.number(5) }
      before(:each) do
        get "/api/v1/users/#{invalid_user_id}", headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 404 status' do
        expect(response).to have_http_status(404)
      end

      it 'returns couldn\'t find user message' do
        expect(json['errors']['message']).to include "Couldn't find User with 'id'=#{invalid_user_id}"
      end
    end

    context 'user_id is valid' do
      before(:each) do
        get "/api/v1/users/#{regular_user.id}", params: user_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 200 status' do
        expect(response).to have_http_status(200)
      end

      it 'returns user details' do
        expect(json['name']).to match(regular_user.name)
        expect(json['email']).to match(regular_user.email)
        expect(json['role']).to match(regular_user.role)
      end
    end
  end

  describe 'POST /users' do
    context 'params are blank' do
      let(:user_blank_params) do
        {
          user: {
            name: Faker::Lorem.word
          }
        }
      end

      before(:each) do
        post '/api/v1/users', params: user_blank_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 422 status' do
        expect(response).to have_http_status(422)
      end

      it 'returns errors' do
        expect_error('Email can\'t be blank')
        expect_error('Role can\'t be blank')
        expect_error('Role is not included in the list')
      end
    end

    context 'params are invalid' do
      before(:each) do
        post '/api/v1/users', params: user_invalid_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 422 status' do
        expect(response).to have_http_status(422)
      end

      it 'returns errors' do
        expect_error('Email has already been taken')
        expect_error('Name can\'t be blank')
        expect_error('Calories is not a number')
      end
    end

    context 'params are valid' do
      before(:each) do
        post '/api/v1/users', params: user_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 200 status' do
        expect(response).to have_http_status(200)
      end

      it 'returns a new user' do
        expect(json['text']).to match(user_params[:user][:text])
        expect(json['email']).to match(user_params[:user][:email])
        expect(json['role']).to match(user_params[:user][:role])
      end
    end
  end

  describe 'PATCH /users/:user_id' do
    context 'params are invalid' do
      before(:each) do
        patch "/api/v1/users/#{regular_user.id}", params: user_invalid_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 422 status' do
        expect(response).to have_http_status(422)
      end

      it 'returns errors' do
        expect_error('Email has already been taken')
        expect_error('Calories is not a number')
      end
    end

    context 'params are valid' do
      before(:each) do
        patch "/api/v1/users/#{regular_user.id}", params: user_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 200 status' do
        expect(response).to have_http_status(200)
      end

      it 'updates the user' do
        expect(json['text']).to match(user_params[:user][:text])
        expect(json['email']).to match(user_params[:user][:email])
        expect(json['role']).to match(user_params[:user][:role])
      end
    end
  end

  describe 'DELETE /users/:user_id' do
    context 'user is invalid' do
      let(:invalid_user_id) { Faker::Number.number(5) }
      before(:each) do
        delete "/api/v1/users/#{invalid_user_id}", headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 404 status' do
        expect(response).to have_http_status(404)
      end

      it 'returns couldn\'t find user message' do
        expect(json['errors']['message']).to include "Couldn't find User with 'id'=#{invalid_user_id}"
      end
    end

    context 'user_id is valid' do
      before(:each) do
        delete "/api/v1/users/#{manager_user.id}", headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 204 status' do
        expect(response).to have_http_status(204)
      end
    end
  end
end
