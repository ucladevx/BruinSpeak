class Petition < ApplicationRecord
  belongs_to :user
  #TODO: Validation

  mount_uploader :image, PetitionImageUploader
end
