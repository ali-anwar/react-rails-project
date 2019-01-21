# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Meal, type: :model do
  context '#create' do
    it { should validate_presence_of(:text) }
    it { should validate_presence_of(:date) }
    it { should validate_presence_of(:time) }
    it { should validate_presence_of(:no_of_calories) }
    it { should validate_numericality_of(:no_of_calories) }
    it { should belong_to(:user) }
  end
end
