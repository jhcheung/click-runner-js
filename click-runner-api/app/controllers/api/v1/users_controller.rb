class Api::V1::UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]

    def index
        users = User.all
        render json: Api::V1::UserSerializer.new(users)
    end

    def create
        user = User.find_or_create_by(user_params)

        if user.valid?
            render json: Api::V1::UserSerializer.new(user)
        else
            render json: user.errors, status: :unprocessable_entity
        end
    end

    def show
        render json: Api::V1::UserSerializer.new(@user)
    end

    def update
        @user = User.assign_attributes(user_params)

        if @user.save
            render json: Api::V1::UserSerializer.new(@user)
        else 
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def destroy
        user = @user.destroy

        render json: Api::V1::UserSerializer.new(user)
    end

    private

    def set_user
        @user = User.find params[:id]
    end

    def user_params
        params.require(:user).permit(:name)
    end

end
