# frozen_string_literal: true

class RemoveDescriptionFromMeals < ActiveRecord::Migration[5.2]
  def change
    remove_column :meals, :description, :text
  end
end
