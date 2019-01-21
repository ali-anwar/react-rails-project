# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Meal', type: :request do
  let!(:admin_user) { create :user, :admin }
  let!(:regular_user) { create :user, :regular }
  subject! { create(:meal, user: admin_user) }

  let(:time) { Faker::Time.between(2.days.ago, Date.today).strftime('%H:%M') }
  let(:date) { Faker::Business.credit_card_expiry_date }
  let!(:admin_credentials) do
    {
      email: admin_user.email,
      password: admin_user.password
    }
  end

  let(:meal_params) do
    {
      meal: {
        text: Faker::Lorem.word,
        no_of_calories: 100,
        date: date,
        time: time,
        user_id: regular_user.id
      }
    }
  end

  let(:meal_invalid_params) do
    {
      meal: {
        no_of_calories: Faker::Lorem.word
      }
    }
  end

  let(:invalid_meal_id) { Faker::Number.number(5) }

  before(:each) do
    @admin_session = login_in_with admin_credentials
  end

  describe 'GET /meals' do
    context 'all meals' do
      before(:each) do
        get '/api/v1/meals', headers: request_headers(
          'Authorization' => @admin_session.headers['Authorization']
        )
      end

      it 'returns meals as json' do
        meal = json.first
        expect(meal['text']).to match(subject.text)
        expect(Date.parse(meal['date'])).to eq(Date.parse(subject.date.to_s))
        expect(meal['time']).to eq(Time.parse(subject.time.to_s).strftime('%H:%M'))
      end
    end
  end

  describe 'POST /meals' do
    context 'params are valid' do
      before(:each) do
        post '/api/v1/meals', params: meal_params, headers: request_headers(
          'Authorization' => @admin_session.headers['Authorization']
        )
      end

      it 'returns 200 status' do
        expect(response).to have_http_status(200)
      end

      it 'returns a new meal' do
        expect(json['text']).to match(meal_params[:meal][:text])
        expect(json['no_of_calories']).to match(meal_params[:meal][:no_of_calories])
        expect(Date.parse(json['date'])).to eq(date)
        expect(json['time']).to eq(time)
        expect(json['user_id']).to eq(regular_user.id)
      end
    end

    context 'params are invalid' do
      before(:each) do
        post '/api/v1/meals', params: meal_invalid_params, headers: request_headers(
          'Authorization' => @admin_session.headers['Authorization']
        )
      end

      it 'returns 422 status' do
        expect(response).to have_http_status(422)
      end

      it 'returns errors' do
        expect_error('User must exist')
        expect_error('Text can\'t be blank')
        expect_error('Date can\'t be blank')
        expect_error('Time can\'t be blank')
        expect_error('No of calories is not a number')
      end
    end
  end

  describe 'PATCH /meals/:meal_id' do
    context 'meal_id is invalid' do
      before(:each) do
        patch "/api/v1/meals/#{invalid_meal_id}", params: meal_params, headers: request_headers(
          'Authorization' => @admin_session.headers['Authorization']
        )
      end

      it 'returns 404 status' do
        expect(response).to have_http_status(404)
      end

      it 'returns couldn\'t find meal message' do
        expect_error("Couldn't find Meal with 'id'=#{invalid_meal_id}")
      end
    end

    context 'meal_id is valid and params are invalid' do
      before(:each) do
        patch "/api/v1/meals/#{subject.id}", params: meal_invalid_params, headers: request_headers(
          'Authorization' => @admin_session.headers['Authorization']
        )
      end

      it 'returns 422 status' do
        expect(response).to have_http_status(422)
      end

      it 'returns errors' do
        expect_error('No of calories is not a number')
      end
    end

    context 'meal_id is valid and params are valid' do
      before(:each) do
        patch "/api/v1/meals/#{subject.id}", params: meal_params, headers: request_headers(
          'Authorization' => @admin_session.headers['Authorization']
        )
      end

      it 'returns 200 status' do
        expect(response).to have_http_status(200)
      end

      it 'update the meal' do
        expect(json['text']).to match(meal_params[:meal][:text])
        expect(json['no_of_calories']).to match(meal_params[:meal][:no_of_calories])
        expect(Date.parse(json['date'])).to eq(date)
        expect(Time.parse(json['time']).strftime('%H:%M')).to eq(time)
        expect(json['user_id']).to eq(regular_user.id)
      end
    end
  end

  describe 'DELETE /meals/:meal_id' do
    context 'meal_id is invalid' do
      before(:each) do
        delete "/api/v1/meals/#{invalid_meal_id}", params: meal_params, headers: request_headers(
          'Authorization' => @admin_session.headers['Authorization']
        )
      end

      it 'returns 404 status' do
        expect(response).to have_http_status(404)
      end

      it 'returns couldn\'t find meal message' do
        expect(json['errors']['message']).to include "Couldn't find Meal with 'id'=#{invalid_meal_id}"
      end
    end

    context 'meal_id is valid' do
      before(:each) do
        delete "/api/v1/meals/#{subject.id}", headers: request_headers(
          'Authorization' => @admin_session.headers['Authorization']
        )
      end

      it 'returns 204 status' do
        expect(response).to have_http_status(204)
      end
    end
  end
end
