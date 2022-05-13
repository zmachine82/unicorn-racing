require "test_helper"

class Api::V1::RaceResultsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_v1_race_result = api_v1_race_results(:one)
  end

  test "should get index" do
    get api_v1_race_results_url, as: :json
    assert_response :success
  end

  test "should create api_v1_race_result" do
    assert_difference('Api::V1::RaceResult.count') do
      post api_v1_race_results_url, params: { api_v1_race_result: { race_id: @api_v1_race_result.race_id, unicorn_id: @api_v1_race_result.unicorn_id } }, as: :json
    end

    assert_response 201
  end

  test "should show api_v1_race_result" do
    get api_v1_race_result_url(@api_v1_race_result), as: :json
    assert_response :success
  end

  test "should update api_v1_race_result" do
    patch api_v1_race_result_url(@api_v1_race_result), params: { api_v1_race_result: { race_id: @api_v1_race_result.race_id, unicorn_id: @api_v1_race_result.unicorn_id } }, as: :json
    assert_response 200
  end

  test "should destroy api_v1_race_result" do
    assert_difference('Api::V1::RaceResult.count', -1) do
      delete api_v1_race_result_url(@api_v1_race_result), as: :json
    end

    assert_response 204
  end
end
