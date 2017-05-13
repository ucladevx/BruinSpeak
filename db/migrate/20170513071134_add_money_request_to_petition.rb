class AddMoneyRequestToPetition < ActiveRecord::Migration[5.0]
  def change
    add_column :petitions, :money_request, :integer, default: 0
  end
end
