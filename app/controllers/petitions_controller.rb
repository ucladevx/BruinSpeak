class PetitionsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :set_public]

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

  def set_public
    @petition = Petition.find(params[:id])
    respond_to do |format|
      if current_user.id == @petition.user_id
        @petition.public = !@petition.public
        if @petition.save
          message = { message: "Petition is now #{@petition.public}" }
          format.json { render json: message }
        else
          message = { error: "There was a problem" }
          format.json { render json: message, status: 500 }
        end
      else
        message = { error: 'You are not allowed' }
        format.json { render json: message, status: 400 }
      end
    end
  end

  def destroy
    @petition = Petition.find(params[:id])
    @petition.signatures.each do |signature|
      signature.destroy
    end
    @petition.tags.each do |tag|
      tag.destroy
    end
    @petition.comment_threads.each do |comment|
      comment.destroy
    end
    @petition.destroy
    redirect_to root_path
  end

  private

  def petitionParams
    params.require(:petition).permit(:title, :description, :image, :tag_list, :goal, :user_id)
  end

  def signatureParams
    params.require(:signature).permit(:support_text)
  end
end
