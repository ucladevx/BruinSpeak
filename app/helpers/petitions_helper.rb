module PetitionsHelper
  def get_recievers(petition)
    if petition.recievers
      return petition.recievers.split(",")
    end
  end
end
