class AddIdToSignature < ActiveRecord::Migration[5.0]
  def change
    add_column :signatures, :id, :primary_key
  end
end
