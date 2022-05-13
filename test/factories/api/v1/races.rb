FactoryBot.define do
  factory :api_v1_race, class: 'Api::V1::Race' do
    name { "MyString" }
    start_ts { "2022-05-12 18:51:26" }
  end
end
