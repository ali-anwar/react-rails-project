# frozen_string_literal: true

class CreateMeals < ActiveRecord::Migration[5.2]
  def change
    create_table :meals do |t|
      t.date :date, null: false
      t.time :time, null: false
      t.text :description
      t.string :name, null: false
      t.integer :no_of_calories
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end

    add_index :meals, :name
    add_index :meals, :date
    add_index :meals, :time
  end
end
