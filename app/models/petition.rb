class Petition < ApplicationRecord
  #TODO: Validation
  validates :title, presence: true, length: { maximum: 80 }

  validates :description, presence: true

  mount_uploader :image, PetitionImageUploader

  belongs_to :user

  acts_as_commentable
end
