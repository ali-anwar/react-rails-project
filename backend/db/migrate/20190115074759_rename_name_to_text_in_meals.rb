# frozen_string_literal: true

class RenameNameToTextInMeals < ActiveRecord::Migration[5.2]
  def change
    rename_column :meals, :name, :text
  end
end
