# frozen_string_literal: true

FactoryBot.define do
  factory :meal do
    date { Faker::Business.credit_card_expiry_date }
    time { Faker::Time.between(2.days.ago, Date.today, :midnight).strftime('%H:%M') }
    text { Faker::Lorem.word }
    no_of_calories { 1 }
    user { create :user, :admin }
  end
end
