FactoryBot.define do
  factory :api_v1_race_result, class: 'Api::V1::RaceResult' do
    race { nil }
    unicorn { nil }
  end
end
