class AddCaloriesToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :calories, :integer, null: false
    add_index :users, :calories
  end
end
