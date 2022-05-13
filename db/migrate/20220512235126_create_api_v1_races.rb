class CreateApiV1Races < ActiveRecord::Migration[6.1]
  def change
    create_table :api_v1_races do |t|
      t.string :name
      t.timestamp :start_ts

      t.timestamps
    end
  end
end
