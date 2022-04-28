require "test_helper"

class Api::V1::UnicornsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_v1_unicorn = FactoryBot.create(:api_v1_unicorn)
  end

  test "should get index" do
    get api_v1_unicorns_url, as: :json
    assert_response :success
  end

  test "should create api_v1_unicorn" do
    assert_difference('Api::V1::Unicorn.count') do
      post api_v1_unicorns_url, params: { api_v1_unicorn: { name: @api_v1_unicorn.name } }, as: :json
    end

    assert_response 201
  end

  test "should show api_v1_unicorn" do
    get api_v1_unicorn_url(@api_v1_unicorn), as: :json
    assert_response :success
  end

  test "should update api_v1_unicorn" do
    patch api_v1_unicorn_url(@api_v1_unicorn), params: { api_v1_unicorn: { name: @api_v1_unicorn.name } }, as: :json
    assert_response 200
  end

  test "should destroy api_v1_unicorn" do
    assert_difference('Api::V1::Unicorn.count', -1) do
      delete api_v1_unicorn_url(@api_v1_unicorn), as: :json
    end

    assert_response 204
  end
end
