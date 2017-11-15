class PetitionsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :toggle_public]

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

    if user_signed_in? and current_user.at_least_gov?
      respond_to do |format|
        format.html
        format.csv { send_data gen_signatures_csv(@petition), filename: "petition-#{@petition.id}-signatures-#{Date.today}.csv"}
      end
    else
      request.format = "html"
      respond_to do | format|
        format.html
      end
    end
  end

  def toggle_public
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

  def change_to_victory
    @petition = Petition.find(params[:id])
    @petition.status = "victory"
    @petition.save
    redirect_to @petition
  end

  def change_to_active
    @petition = Petition.find(params[:id])
    @petition.status = "active"
    @petition.save
    redirect_to @petition
  end

  def change_to_closed
    @petition = Petition.find(params[:id])
    @petition.status = "closed"
    @petition.save
    redirect_to @petition
  end

  private
  def gen_signatures_csv(petition)
    header = %w{first_name last_name email reason signed_at major year}
    CSV.generate(headers: true) do |csv|
      csv << header

      petition.signatures.each do |sig|
        user = sig.user
        line = [user.first_name, user.last_name, user.email, sig.reason, sig.created_at, user.major, user.year]
        csv << line
      end
    end
  end

  def petitionParams
    params[:petition][:recievers] = params[:petition][:recievers].join(",")
    params.require(:petition).permit(:title, :description, :image, :tag_list, :goal, :user_id, :money_request, :public, :recievers)
  end

  def signatureParams
    params.require(:signature).permit(:support_text)
  end    
end
