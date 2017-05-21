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
  validates :role, numericality: { greater_than_or_equal_to: 0, less_than: 3 }

  mount_uploader :profile_pic, ProfilePicUploader

  has_many :petitions, dependent: :destroy
  has_many :signatures
  has_many :petitions, through: :signatures

  def admin?
    return role == 2
  end

  def at_least_gov?
    return role > 0
  end

  def government?
    return role == 1
  end

  def default?
    return role == 0
  end

  def get_role
    roles = {
      0 => "Default",
      1 => "Government",
      2 => "Admin"
    }

    return roles[role]
  end

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
