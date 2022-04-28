class CreateApiV1Unicorns < ActiveRecord::Migration[6.1]
  def change
    create_table :api_v1_unicorns do |t|
      t.string :name

      t.timestamps
    end
  end
end
