class Petition < ApplicationRecord
  #TODO: Validation
  validates :title, presence: true, length: { maximum: 80 }

  validates :description, presence: true

  validates :goal, presence: true, numericality: { only_integer: true, greater_than: 0 }

  mount_uploader :image, PetitionImageUploader

  belongs_to :user

  acts_as_commentable
  has_many :signatures
  has_many :users, through: :signatures
  acts_as_taggable
end
