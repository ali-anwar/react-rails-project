# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Signup', type: :request do
  describe 'POST /users' do
    let(:url) { '/users' }
    let(:email) { Faker::Internet.unique.safe_email }
    let(:params) do
      {
        user: {
          email: email,
          password: Faker::Number.number(10),
          name: Faker::Name.name
        }
      }
    end

    context 'when user is unauthenticated' do
      before(:each) do
        post url, params: params
      end

      it 'returns 200 status' do
        expect(response).to have_http_status(200)
      end

      it 'returns a new user' do
        expect(json['email']).to match(params[:user][:email])
      end

      it 'returns new user with regular role' do
        expect(json['role']).to match('regular')
      end
    end

    context 'when user already exists' do
      before(:each) do
        create(:user, :regular, email: params[:user][:email], name: params[:user][:name])
        post url, params: params
      end

      it 'returns 422 status' do
        expect(response).to have_http_status 422
      end

      it 'returns validation errors' do
        expect_error('Email has already been taken')
      end
    end
  end
end
