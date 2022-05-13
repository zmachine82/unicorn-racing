class Api::V1::Unicorn < ApplicationRecord
    has_many :race_results
    validates :name, presence: true, length: {minimum: 3, maximum:50}
    
end
