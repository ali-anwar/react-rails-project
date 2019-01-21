# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Meal', type: :request do
  let!(:manager_user) { create(:user, :manager) }
  let!(:admin_meal) { create :meal }

  subject! { create(:meal, user: manager_user) }

  let(:time) { Faker::Time.between(2.days.ago, Date.today).strftime('%H:%M') }
  let(:date) { Faker::Business.credit_card_expiry_date }

  let!(:manager_credentials) do
    {
      email: manager_user.email,
      password: manager_user.password
    }
  end

  let(:meal_params) do
    {
      meal: {
        text: Faker::Lorem.word,
        no_of_calories: 100,
        date: date,
        time: time
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
    @manager_session = login_in_with manager_credentials
  end

  describe 'GET /meals' do
    context "manager user can't view other users meals" do
      before(:each) do
        get '/api/v1/meals', headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'does not review other user meal' do
        expect(json.collect { |record| record['user_id'] }.include?(admin_meal.user_id)).to be false
      end
    end

    context 'can view his own meals' do
      before(:each) do
        get '/api/v1/meals', headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns meals as json' do
        meal = json.first
        expect(meal['text']).to match(subject.text)
        expect(meal['no_of_calories']).to match(subject.no_of_calories)
        expect(Date.parse(meal['date'])).to eq(Date.parse(subject.date.to_s))
        expect(meal['time']).to eq(Time.parse(subject.time.to_s).strftime('%H:%M'))
        expect(meal['user_id']).to eq(manager_user.id)
      end
    end
  end

  describe 'POST /meals' do
    context 'params are valid' do
      before(:each) do
        post '/api/v1/meals', params: meal_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
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
        expect(json['user_id']).to eq(subject.user_id)
      end
    end

    context 'params are invalid' do
      before(:each) do
        post '/api/v1/meals', params: meal_invalid_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 422 status' do
        expect(response).to have_http_status(422)
      end

      it 'returns errors' do
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
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 404 status' do
        expect(response).to have_http_status(404)
      end

      it 'returns couldn\'t find meal message' do
        expect(json['errors']['message']).to include "Couldn't find Meal with 'id'=#{invalid_meal_id}"
      end
    end

    context 'meal_id is valid and params are invalid' do
      before(:each) do
        patch "/api/v1/meals/#{subject.id}", params: meal_invalid_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 422 status' do
        expect(response).to have_http_status(422)
      end

      it 'returns validation errors' do
        expect_error('No of calories is not a number')
      end
    end

    context 'manager can update his meals only' do
      before(:each) do
        patch "/api/v1/meals/#{subject.id}", params: meal_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 200 status' do
        expect(response).to have_http_status(200)
      end

      it 'returns the updated meal' do
        expect(json['text']).to match(meal_params[:meal][:text])
        expect(json['no_of_calories']).to match(meal_params[:meal][:no_of_calories])
        expect(Date.parse(json['date'])).to eq(date)
        expect(Time.parse(json['time']).strftime('%H:%M')).to eq(time)
        expect(json['user_id']).to eq(subject.user_id)
      end
    end

    context 'manager is not permitted to update other users meals' do
      before(:each) do
        patch "/api/v1/meals/#{admin_meal.id}", params: meal_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns error code' do
        expect(response).to have_http_status(403)
        expect(json['errors']['status']).to eq 403
      end

      it 'returns error message' do
        expect_error('You are not authorized to perform this action')
      end
    end

    context 'meal_id is valid and params are valid' do
      before(:each) do
        patch "/api/v1/meals/#{admin_meal.id}", params: meal_params, headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 403 status' do
        expect(response).to have_http_status(403)
      end

      it 'returns validation errors' do
        expect_error('You are not authorized to perform this action')
      end
    end
  end

  describe 'DELETE /meals/:meal_id' do
    context 'meal_id is invalid' do
      before(:each) do
        delete "/api/v1/meals/#{invalid_meal_id}", headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 404 status' do
        expect(response).to have_http_status(404)
      end

      it 'returns couldn\'t find meal message' do
        expect_error("Couldn't find Meal with 'id'=#{invalid_meal_id}")
      end
    end

    context 'manager is not permitted to delete other user meals' do
      before(:each) do
        delete "/api/v1/meals/#{admin_meal.id}", headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 403 status' do
        expect(response).to have_http_status(403)
      end
    end

    context 'meal_id is valid' do
      before(:each) do
        delete "/api/v1/meals/#{subject.id}", headers: request_headers(
          'Authorization' => @manager_session.headers['Authorization']
        )
      end

      it 'returns 204 status' do
        expect(response).to have_http_status(204)
      end
    end
  end
end
