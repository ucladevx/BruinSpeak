class AddImaageColumnToPetitions < ActiveRecord::Migration[5.0]
  def change
    add_column :petitions, :image, :string
  end
end
