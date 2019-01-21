# frozen_string_literal: true

class Meal < ApplicationRecord
  belongs_to :user

  validates :text, presence: true
  validates :date, presence: true
  validates :time, presence: true
  validates :no_of_calories, presence: true
  validates :no_of_calories, numericality: true
end
