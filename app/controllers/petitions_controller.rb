class PetitionsController < ApplicationController
  def new
    @petition = Petition.new
  end

  def create
    @petition = Petition.new(petitionParams)
    @petition.save
    redirect_to root_path, :notice => "Your petition has been created"
  end

  private

  def petitionParams
    params.require(:petition).permit(:title, :description)
  end
end
