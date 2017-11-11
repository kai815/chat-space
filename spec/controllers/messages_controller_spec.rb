require 'rails_helper'

describe MessagesController, type: :controller do
   let(:user) { create(:user) }
   let(:group) { create(:group) }
   let(:message) { build(:message) }

  describe 'GET #index' do
    context ' user_signed_in' do

      before do
        login_user user
      end

      it "assigns the requested blank_message to @message" do
        blank_message = Message.new
        get :index, params: { group_id: group }
        expect(assigns(:message).attributes).to eq(blank_message.attributes)
      end

      it "assigns the requested group to @group" do
        get :index, params:{ group_id: group}
        expect(assigns(:group)).to eq group
      end

      it "assigns the requested groups to @groups" do
        groups = create_list(:group, 3)
        groups.each do |g|
          g.members.create(user: user)
        end
        get :index, params:{ group_id: groups.first.id}
        groups = user.groups
        expect(assigns(:groups)).to eq groups
      end

      it "assigns the requested messages to @messages " do
        messages = create_list(:message, 3, user_id: user.id, group_id: group.id)
        get :index, params:{ group_id: group}
        expect(assigns(:messages)).to eq messages
      end

      it "renders the :index template" do
        get :index, params:{ group_id: group}
        expect(response).to render_template :index
      end
    end

    context 'user_not_signed_in' do
      it "redirect_to new_user_session" do
        get :index, params: {group_id: group }
        expect(response).to redirect_to new_user_session_path
      end
    end
  end


  describe 'POST #create' do
    context ' user_signed_in ' do
      before do
        login_user user
      end

      it 'message_save' do
        expect do
        post :create, params:{ group_id: group, message:attributes_for(:message)}
        end.to change(Message, :count).by(1)
      end

      it 'message_not_save' do
        expect do
        post :create, params:{ group_id: group, message: attributes_for(:message, body: nil, image: nil) }
        end.to change(Message, :count).by(0)
      end
    end

    context ' user_not_sgined_in ' do
      it "redirect_to new_user_session" do
        get :index, params: {group_id: group }
        expect(response).to redirect_to new_user_session_path
      end

      it "message_not_save" do
        expect do
        post :create, params:{ group_id: group, message:attributes_for(:message)}
        end.to change(Message, :count).by(0)
      end
    end
  end
end
