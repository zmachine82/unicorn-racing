require "test_helper"
require_relative "../../app/services/unicorn_services/bet_handler"

class BetHandlerTest < ActiveSupport::TestCase
    test "bet is created when user has enough unicoins to make the bet" do
        make_successful_bet

        assert @result[:new_balance] == @ending_balance
        assert User.find(1).balance == @ending_balance
    end

    test "bet is created when user has enough unicoins to make the bet with end result of 0 balance" do
        starting_balance = 500
        ending_balance = 0
        user = User.new(
            first_name: "Steve",
            last_name: "Moneybags",
            email: "s$m@ilikemoney.com",
            phone: "555-5555",
            password: "1234",
            password_confirmation: "1234",
            balance: starting_balance
          )
          user.save!

          race = Api::V1::Race.create({name: 'best race'})
          unicorn = Api::V1::Unicorn.create({name: 'best unicorn'})
        service = BetHandler.new
        result = service.new_bet({race_id: 1, unicorn_id: 1, user:  user, amount: 500})
        assert result[:new_balance] == ending_balance
        assert User.find(1).balance == ending_balance
    end

    test "bet is not created when user does not have enough unicoins to make the bet" do
        starting_balance = rand(1..2)
        ending_balance = starting_balance - 500
        user = User.new(
            first_name: "Steve",
            last_name: "Moneybags",
            email: "s$m@ilikemoney.com",
            phone: "555-5555",
            password: "1234",
            password_confirmation: "1234",
            balance: starting_balance
          )
          user.save!

          race = Api::V1::Race.create({name: 'best race'})
          unicorn = Api::V1::Unicorn.create({name: 'best unicorn'})
        service = BetHandler.new
        exception = assert_raises(Exception) {service.new_bet({race_id: 1, unicorn_id: 1, user:  user, amount: 500})}

        assert_equal("User does not have enough to make this bet", exception.message)
        assert User.find(1).balance == starting_balance
    end

    test "successful bet is able to be found later" do 
        make_successful_bet

        bet = Api::V1::Bet.find(1)

        assert bet.user == @user 
        assert bet.race.id == @request[:race_id ]
        assert bet.unicorn.id == @request[:unicorn_id]
        assert bet.amount == @request[:amount]
        assert bet.paid_out == false
        assert bet.id > 0
    end

    test "bet should only be successful if race is not finished" do 
        starting_balance = 1000
        user = User.new(
            first_name: "Steve",
            last_name: "Moneybags",
            email: "s$m@ilikemoney.com",
            phone: "555-5555",
            password: "1234",
            password_confirmation: "1234",
            balance: starting_balance
          )
          user.save!
          race = Api::V1::Race.create({name: 'best race'})
          unicorn = Api::V1::Unicorn.create({name: 'best unicorn'})
          Api::V1::RaceResult.create({race_id: race.id, unicorn_id: unicorn.id})

        
        service = BetHandler.new
        exception = assert_raises(Exception) {service.new_bet({race_id: 1, unicorn_id: 1, user:  user, amount: 500})}

        assert_equal("Race is already finished", exception.message)
        assert User.find(1).balance == starting_balance
    end

    test "bet should only be successful if unicorn does exist" do 
        starting_balance = 1000
        user = User.new(
            first_name: "Steve",
            last_name: "Moneybags",
            email: "s$m@ilikemoney.com",
            phone: "555-5555",
            password: "1234",
            password_confirmation: "1234",
            balance: starting_balance
          )
          user.save!
          race = Api::V1::Race.create({name: 'best race'})
          Api::V1::RaceResult.create({race_id: race.id, unicorn_id: 1})

        
        service = BetHandler.new
        exception = assert_raises(Exception) {service.new_bet({race_id: 1, unicorn_id: 1, user:  user, amount: 500})}

        assert_equal("Unicorn must exist", exception.message)
        assert User.find(1).balance == starting_balance
    end

    private 

    def make_successful_bet
        @starting_balance = rand(1000..2000)
        @ending_balance = @starting_balance - 500
        @user = User.new(
            first_name: "Steve",
            last_name: "Moneybags",
            email: "s$m@ilikemoney.com",
            phone: "555-5555",
            password: "1234",
            password_confirmation: "1234",
            balance: @starting_balance
          )
          @user.save!
          @service = BetHandler.new
          @race = Api::V1::Race.create({name: 'best race'})
          @unicorn = Api::V1::Unicorn.create({name: 'best unicorn'})
          @request = {race_id: 1, unicorn_id: 1, user:  @user, amount: 500}
          @result = @service.new_bet(@request)
    end
end