class AddRecieversToPetitions < ActiveRecord::Migration[5.0]
  def change
    add_column :petitions, :recievers, :string
  end
end
