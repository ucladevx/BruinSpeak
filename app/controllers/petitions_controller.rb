class PetitionsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

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
    @new_comment = Comment.build_from(@petition, current_user.id, "")
    @comments = @petition.comment_threads
    @root_comments = @petition.root_comments
    @signature = Signature.new
  end

  private

  def petitionParams
    params.require(:petition).permit(:title, :description, :image, :tag_list)
  end

  def signatureParams
    params.require(:signature).permit(:support_text)
  end
end
