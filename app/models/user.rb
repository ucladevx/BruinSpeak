class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :first_name, format: { with: /\A([A-Za-z-]){2,}\z/ }, presence: true,
                        length: { minimum: 2 }

  validates :last_name, format: { with: /\A([A-Za-z-]){2,}\z/ }, presence: true,
                        length: { minimum: 2 }

  mount_uploader :profile_pic, ProfilePicUploader

  has_many :petitions, dependent: :destroy
end
