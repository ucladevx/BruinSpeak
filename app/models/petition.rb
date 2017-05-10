class Petition < ApplicationRecord
  #TODO: Validation

  attr_accessor :score

  validates :title, presence: true, length: { maximum: 80 }

  validates :description, presence: true

  validates :goal, presence: true, numericality: { only_integer: true, greater_than: 0 }

  mount_uploader :image, PetitionImageUploader

  belongs_to :user

  acts_as_commentable
  has_many :signatures
  has_many :users, through: :signatures
  acts_as_taggable

  def self.get_trending
    puts("TRENDING")
    petitions = Petition.all
    now = Time.new
    petitions.each do |petition|
      date_month = petition.created_at + 1.month
      alpha = (date_month - (now - petition.created_at)).to_i / date_month.to_f
      alpha = alpha * 0.7
      score = alpha + (1-alpha) * ((petition.signatures.count + 1)/petition.goal.to_f)
      petition.score = score
    end

    sorted = petitions.sort { |x, y| x.score <=> y.score}
    return sorted.reject { |pet| pet.score == 1}
  end

  def self.trending
    Rails.cache.fetch("trending_petitions", expires_in: 1.hour) do
      get_trending()
    end
  end
end
