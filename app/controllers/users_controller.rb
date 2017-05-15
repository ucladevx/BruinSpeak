class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @public_petitions = Petition.where(user_id: @user.id).where.not(public: "FALSE")
    @private_petitions = Petition.where(user_id: @user.id).where(public: "FALSE")
    @signatures = Signature.where(user_id: @user.id)
  end

  def update_role
    user = User.find(params[:user][:id])
    new_role = params[:user][:role]

    respond_to do |format|
      if user.update(role: new_role)
        # TODO: make AJAX request instead of reloading page
        format.html { redirect_to(:back, notice: 'Role was successfully changed') }
      else
        # TODO: If the comment fails to delete, pop up a notification
        format.html { redirect_to(:back) }
      end
    end
  end
end
