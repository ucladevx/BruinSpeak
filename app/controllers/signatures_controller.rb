class SignaturesController < ApplicationController
  def create
    @signature = Signature.new(signatureParams)
    if @signature.save
      redirect_to Petition.find(signatureParams[:petition_id]), :notice => "Your signature has been recorded"
    else
      redirect_to root_path, :notice => "Failed to create signature"
    end
  end

  private

  def signatureParams
    params.require(:signature).permit(:user_id, :petition_id, :reason)
  end
end
