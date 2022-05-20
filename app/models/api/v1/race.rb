class Api::V1::Race < ApplicationRecord
    has_one :race_result
    has_many :bets

    def is_finished?
        race_result != nil
    end

    def self.not_finished
        Api::V1::Race.all.filter {|race| !race.is_finished?}
    end

    def run_race_simulation
        winning_unicorn = Api::V1::Unicorn.all.sample

        
        Api::V1::RaceResult.create({race_id: id, unicorn_id: winning_unicorn.id})
    end
end
