class Api::V1::Bet < ApplicationRecord
  belongs_to :user
  belongs_to :race
  belongs_to :unicorn
end

# TODO: add validation -- bet amount must be positive