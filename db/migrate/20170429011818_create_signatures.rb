class CreateSignatures < ActiveRecord::Migration[5.0]
  def change
    create_table :signatures, id: false do |t|
      t.belongs_to :user, index: true
      t.belongs_to :petition, index: true
      
      t.timestamps
    end
  end
end
