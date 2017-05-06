class PetitionsController < ApplicationController
  before_action :authenticate_user!

  def new
    @petition = Petition.new
  end

  def create
    @petition = current_user.petitions.build(petitionParams)

    if @petition.save
      redirect_to @petition, :notice => "Your petition has been created"
    else
      render :new
    end
  end

  def show
    @petition = Petition.find(params[:id])
    @signature = Signature.new

    if user_signed_in?
      @new_comment = Comment.build_from(@petition, current_user.id, "")
    end
  end

  private

  def petitionParams
    params.require(:petition).permit(:title, :description, :image, :tag_list, :goal, :user_id)
  end

  def signatureParams
    params.require(:signature).permit(:support_text)
  end
end
