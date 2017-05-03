class AddGoalToPetitions < ActiveRecord::Migration[5.0]
  def change
    add_column :petitions, :goal, :integer, null: false
  end
end
