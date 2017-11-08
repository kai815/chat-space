require 'rails_helper'

describe Message do
  describe '#create' do

    it "is valid with a body" do
      user = create(:user)
      group = create(:group)
      message = build(:message, image:nil)
      message.valid?
      expect(message).to be_valid
    end

    it "is valid with a image" do
      user = create(:user)
      group = create(:group)
      message = build(:message, body:nil)
      message.valid?
      expect(message).to be_valid
    end

    it "is valid with a body and a image" do
      user = create(:user)
      group = create(:group)
      message = build(:message)
      message.valid?
      expect(message).to be_valid
    end

    it "is invalid without a body and a image" do
      user = create(:user)
      group = create(:group)
      message = build(:message, body: nil, image: nil)
      message.valid?
      expect(message.errors[:body_or_image]).to include("を入力してください")
    end

    it "is invalid without a group_id" do
      user = create(:user)
      group = create(:group)
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end

    it "is invalid without a user_id" do
      user = create(:user)
      group = create(:group)
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end

  end
end
