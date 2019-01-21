# frozen_string_literal: true

class MealPolicy < ApplicationPolicy
  def create?
    own_record_or_admin?
  end

  def update?
    own_record_or_admin?
  end

  def destroy?
    own_record_or_admin?
  end

  class Scope < Scope
    def resolve
      if user.admin?
        super
      else
        scope.where(user: user)
      end
    end
  end

  protected

  def own_record_or_admin?
    user == record.user || admin?
  end
end
