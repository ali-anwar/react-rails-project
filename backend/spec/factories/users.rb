# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.safe_email }
    name { Faker::Name.name }
    password { Faker::Number.number(10) }
    calories { Faker::Number.number(3) }

    trait :invalid_role do
      role { Faker::Lorem.word }
    end

    trait :admin do
      role { :admin }
    end

    trait :manager do
      role { :manager }
    end

    trait :regular do
      role { :regular }
    end
  end
end
