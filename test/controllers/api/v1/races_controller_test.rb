require "test_helper"

class Api::V1::RacesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_v1_race = api_v1_races(:one)
  end

  test "should get index" do
    get api_v1_races_url, as: :json
    assert_response :success
  end

  test "should create api_v1_race" do
    assert_difference('Api::V1::Race.count') do
      post api_v1_races_url, params: { api_v1_race: { name: @api_v1_race.name, start_ts: @api_v1_race.start_ts } }, as: :json
    end

    assert_response 201
  end

  test "should show api_v1_race" do
    get api_v1_race_url(@api_v1_race), as: :json
    assert_response :success
  end

  test "should update api_v1_race" do
    patch api_v1_race_url(@api_v1_race), params: { api_v1_race: { name: @api_v1_race.name, start_ts: @api_v1_race.start_ts } }, as: :json
    assert_response 200
  end

  test "should destroy api_v1_race" do
    assert_difference('Api::V1::Race.count', -1) do
      delete api_v1_race_url(@api_v1_race), as: :json
    end

    assert_response 204
  end
end
