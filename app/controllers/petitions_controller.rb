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
  end

  private

  def petitionParams
    params.require(:petition).permit(:title, :description, :image)
  end
end
