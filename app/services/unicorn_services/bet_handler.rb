

class BetHandler


  def new_bet(bet_req)
    user, amount, race, uni = bet_req.values_at(:user, :amount, :race_id, :unicorn_id)
    user.balance = user.balance - amount
    
    if !Api::V1::Unicorn.exists?(uni)
      raise "Unicorn must exist"
    end
    
    if Api::V1::Race.find(race).is_finished?
      raise "Race is already finished"
    end
    
    if user.balance.negative?
      raise "User does not have enough to make this bet"
    end

    user.save 
    bet_req[:paid_out] = false # TODO: make paid_out default to false upon bet creation
    Api::V1::Bet.create!(bet_req)
    {new_balance:  user.balance}
  end
  
  
end
