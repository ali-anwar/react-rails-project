# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  context '#create' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:role) }
    it { should define_enum_for(:role).with(User.roles.keys) }
    it { should validate_presence_of(:email) }
    it { should have_many(:meals) }
    it { should validate_numericality_of(:calories) }
    it { should_not allow_value(100_000_000).for(:calories) }
  end
end
