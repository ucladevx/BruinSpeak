class AddReasonToSignatures < ActiveRecord::Migration[5.0]
  def change
    add_column :signatures, :reason, :text
  end
end
