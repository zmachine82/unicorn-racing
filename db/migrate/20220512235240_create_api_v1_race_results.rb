class CreateApiV1RaceResults < ActiveRecord::Migration[6.1]
  def change
    create_table :api_v1_race_results do |t|
      t.references :race, null: false, foreign_key: {to_table: :api_v1_races}
      t.references :unicorn, null: false, foreign_key: {to_table: :api_v1_unicorns}

      t.timestamps
    end
  end
end
