# frozen_string_literal: true

class Api::V1::MealSerializer < ActiveModel::Serializer
  attributes :id, :text, :no_of_calories, :date, :time, :user_id

  belongs_to :user

  def time
    object.time.strftime('%H:%M')
  end
end
