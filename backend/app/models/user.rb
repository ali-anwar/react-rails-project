# frozen_string_literal: true

class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable,
         jwt_revocation_strategy: self

  enum role: %i[regular manager admin]

  has_many :meals, dependent: :destroy

  validates :name, presence: true
  validates :role, presence: true, inclusion: { in: User.roles.keys }
  validates :calories, numericality: {
    only_integer: true,
    less_than_or_equal_to: 99_999_999
  }, allow_nil: true

  def set_password
    self.password = Devise.friendly_token.first(8)
  end

  def save_as_regular_user
    self.role = 'regular'
    save
  end
end
