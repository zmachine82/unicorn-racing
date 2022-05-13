class Api::V1::RaceResultsController < Api::V1::ApplicationController
  before_action :set_api_v1_race_result, only: [:show, :update, :destroy]

  # GET /api/v1/race_results
  def index
    @api_v1_race_results = Api::V1::RaceResult.all

    render json: @api_v1_race_results
  end

  # GET /api/v1/race_results/1
  def show
    render json: @api_v1_race_result
  end

  # POST /api/v1/race_results
  def create
    @api_v1_race_result = Api::V1::RaceResult.new(api_v1_race_result_params)

    if @api_v1_race_result.save
      render json: @api_v1_race_result, status: :created, location: @api_v1_race_result
    else
      render json: @api_v1_race_result.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/race_results/1
  def update
    if @api_v1_race_result.update(api_v1_race_result_params)
      render json: @api_v1_race_result
    else
      render json: @api_v1_race_result.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/race_results/1
  def destroy
    @api_v1_race_result.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_v1_race_result
      @api_v1_race_result = Api::V1::RaceResult.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def api_v1_race_result_params
      params.require(:api_v1_race_result).permit(:race_id, :unicorn_id)
    end
end
