class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:google_oauth2]

  validates :first_name, format: { with: /\A([A-Za-z-]){2,}\z/ }, presence: true,
                        length: { minimum: 2 }

  validates :last_name, format: { with: /\A([A-Za-z-]){2,}\z/ }, presence: true,
                        length: { minimum: 2 }

  validates_inclusion_of :role, in: ["default", "government", "admin"]

  mount_uploader :profile_pic, ProfilePicUploader

  has_many :petitions, dependent: :destroy
  has_many :signatures
  has_many :petitions, through: :signatures

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(:email => data["email"]).first

    unless user
      user = User.create(
        email: data["email"],
        first_name: data["first_name"].capitalize,
        last_name: data["last_name"].capitalize,
        password: Devise.friendly_token[0,20]
      )
    end
    return user
  end

  def full_name
    return "#{self.first_name} #{self.last_name}"
  end
end
