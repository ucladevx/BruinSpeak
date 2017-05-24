class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:update_role]
  def show
    @user = User.find(params[:id])
    @public_petitions = Petition.where(user_id: @user.id).where.not(public: "FALSE")
    @private_petitions = Petition.where(user_id: @user.id).where(public: "FALSE")
    @signatures = Signature.where(user_id: @user.id)
  end

  def update_role
    user = User.find(params[:id])
    new_role = params[:role].to_i

    respond_to do |format|
      if current_user.admin?
        user.role = new_role
        if user.save
          message = { message: "User role successfully update to #{new_role}" }
          format.json { render json: message, status: 200 }
        else
          message = { message: "There was a problem changing the role" }
          format.json { render json: message, status: 500 }
        end
      elsif current_user.government? and new_role  < 2
        user.role = new_role
        if user.save
          message = { message: "User role successfully update to #{new_role}" }
          format.json { render json: message, status: 200 }
        else
          message = { message: "There was a problem changing the role" }
          format.json { render json: message, status: 500 }
        end
      else
        message = { error: 'You are not allowed to change to this role' }
        format.json { render json: message, status: 401 }
      end
    end
  end
end
