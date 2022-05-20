class CreateApiV1Bets < ActiveRecord::Migration[6.1]
  def change
    create_table :api_v1_bets do |t|
      t.references :user, null: false, foreign_key: true
      t.references :race, null: false, foreign_key: {to_table: :api_v1_races}
      t.references :unicorn, null: false, foreign_key: {to_table: :api_v1_unicorns}
      t.integer :amount
      t.boolean :paid_out

      t.timestamps
    end
  end
end
