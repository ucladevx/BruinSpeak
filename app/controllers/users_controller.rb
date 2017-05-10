class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @petitions = Petition.where(user_id: @user.id)
  end
end
