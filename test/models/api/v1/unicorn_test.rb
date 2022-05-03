require "test_helper"


class Api::V1::UnicornTest < ActiveSupport::TestCase

  test "name cannot be blank" do
    unicorn = Api::V1::Unicorn.new
    unicorn.name = ''
    assert unicorn.valid? == false
  end

  
  test "name must have minimum of 3 chars" do
    unicorn = Api::V1::Unicorn.new
    unicorn.name = '12'
    assert unicorn.valid? == false
  end

  test "name must have maximum of 50 chars" do
    unicorn = Api::V1::Unicorn.new
    unicorn.name = '1this iasdfndisalf wqdf wqldkfnlkwqfnowqkdfnowqnfod'
    assert unicorn.valid? == false
  end

  test "valid unicorn possible" do
    unicorn = Api::V1::Unicorn.new
    unicorn.name = 'Steve'
    assert unicorn.valid? == true
  end
end
