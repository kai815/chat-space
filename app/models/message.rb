class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  mount_uploader :image, ImageUploader

  validates :body_or_image, presence: true

  def body_or_image
    body.presence || image.presence
  end

  def time
    created_at.strftime("%Y年%m月%d日 %H時%M分")
  end
end
