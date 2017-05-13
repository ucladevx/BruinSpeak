module PetitionsHelper
  def get_recievers(petition)
    return petition.recievers.split(",")
  end
end
