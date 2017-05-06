class AddColumnsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :year, :integer
    add_column :users, :about, :text
  end
end
