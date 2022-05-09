class Api::V1::UnicornsController < Api::V1::ApplicationController
  before_action :set_api_v1_unicorn, only: [:show, :update, :destroy]
  skip_before_action :authenticate, only: %i[index show]
  # GET /api/v1/unicorns
  def index
    @api_v1_unicorns = Api::V1::Unicorn.all

    render json: @api_v1_unicorns
  end

  # GET /api/v1/unicorns/1
  def show
    render json: @api_v1_unicorn
  end

  # POST /api/v1/unicorns
  def create
    @api_v1_unicorn = Api::V1::Unicorn.new(api_v1_unicorn_params)

    if @api_v1_unicorn.save
      render json: @api_v1_unicorn, status: :created, location: @api_v1_unicorn
    else
      render json: @api_v1_unicorn.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/unicorns/1
  def update
    if @api_v1_unicorn.update(api_v1_unicorn_params)
      render json: @api_v1_unicorn
    else
      render json: @api_v1_unicorn.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/unicorns/1
  def destroy
    @api_v1_unicorn.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_v1_unicorn
      @api_v1_unicorn = Api::V1::Unicorn.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def api_v1_unicorn_params
      params.require(:api_v1_unicorn).permit(:name)
    end
end
