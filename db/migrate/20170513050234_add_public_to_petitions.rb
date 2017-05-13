class AddPublicToPetitions < ActiveRecord::Migration[5.0]
  def change
    add_column :petitions, :public, :boolean, default: false
  end
end
