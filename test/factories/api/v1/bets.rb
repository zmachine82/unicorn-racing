FactoryBot.define do
  factory :api_v1_bet, class: 'Api::V1::Bet' do
    user { nil }
    race { nil }
    unicorn { nil }
    amount { 1 }
    paid_out { false }
  end
end
