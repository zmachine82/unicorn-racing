class Api::V1::RaceResult < ApplicationRecord
  belongs_to :race
  belongs_to :unicorn
end
