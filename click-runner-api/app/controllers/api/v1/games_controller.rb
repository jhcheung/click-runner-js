class Api::V1::GamesController < ApplicationController
    before_action :set_game, only: [:show, :update, :destroy]

    def index
        games = Game.all
        render json: Api::V1::GameSerializer.new(games)
    end

    def create
        game = Game.new(game_params)

        if game.save
            render json: Api::V1::GameSerializer.new(game)
        else
            render json: game.errors, status: :unprocessable_entity
        end

    end

    def show
        render json: Api::V1::UserSerializer.new(@game)
    end

    def update
        @game = Game.assign_attributes(game_params)

        if @game.save
            render json: Api::V1::GameSerializer.new(@game)
        else 
            render json: @game.errors, status: :unprocessable_entity
        end

    end

    def destroy
        game = @game.destroy

        render json: Api::V1::GameSerializer.new(user)

    end

    private

    def set_game
        @game = game.find params[:id]
    end

    def game_params
        params.require(:game).permit(:user_id, :score, :lives_modifier, :score_modifier, :obstacle_modifier)
    end

end
