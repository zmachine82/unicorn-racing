class Api::V1::RacesController < Api::V1::ApplicationController
  before_action :set_api_v1_race, only: [:show, :update, :destroy, :finish]

  # GET /api/v1/races
  def index
    @api_v1_races = Api::V1::Race.all

    render json: @api_v1_races, include: ['race_result']
  end

  # GET /api/v1/races/1
  def show
    render json: @api_v1_race
  end

  # POST /api/v1/races
  def create
    @api_v1_race = Api::V1::Race.new(api_v1_race_params)

    if @api_v1_race.save
      render json: @api_v1_race, status: :created, location: @api_v1_race
    else
      render json: @api_v1_race.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/races/1
  def update
    if @api_v1_race.update(api_v1_race_params)
      render json: @api_v1_race
    else
      render json: @api_v1_race.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/races/1
  def destroy
    @api_v1_race.destroy
  end

  def finish
    if @api_v1_race.is_finished?
      render json: "Race is already finished", status: :unprocessable_entity
    end
    render json: @api_v1_race.run_race_simulation
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_v1_race
      @api_v1_race = Api::V1::Race.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def api_v1_race_params
      params.require(:api_v1_race).permit(:name, :start_ts)
    end
end
