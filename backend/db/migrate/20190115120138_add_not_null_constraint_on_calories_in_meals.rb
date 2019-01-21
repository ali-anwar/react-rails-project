class AddNotNullConstraintOnCaloriesInMeals < ActiveRecord::Migration[5.2]
  def change
    change_column_null :meals, :no_of_calories, false
  end
end
