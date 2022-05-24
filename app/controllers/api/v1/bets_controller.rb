

class Api::V1::BetsController <  Api::V1::ApplicationController

    def new_bet_data

        render json: {unicorns: Api::V1::Unicorn.all, races: Api::V1::Race.not_finished}
    end

    def create
        render json: BetHandler.new.new_bet({race_id: params['race_id'], unicorn_id: params['unicorn_id'], user:  @current_user, amount: params['amount']})
    end
end
