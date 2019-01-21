# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    admin_or_manager?
  end

  def show?
    admin_or_manager? || own_record?
  end

  def create?
    admin_or_manager?
  end

  def update?
    admin_or_manager? || own_record?
  end

  def destroy?
    admin_or_manager?
  end

  private

  def admin_or_manager?
    user.admin? || user.manager?
  end

  def own_record?
    user == record
  end
end
