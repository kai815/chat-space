class MessagesController < ApplicationController
  before_action :get_groups_messages, only: [:index, :create]

  def index
    @message = Message.new
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(params[:group_id]) }
        format.json
      end
    else
     flash.now[:alert] = "メッセージを入力してください"
     render :index
    end

  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(group_id: params[:group_id], user_id: current_user.id)
  end

  def get_groups_messages
    @group = Group.find(params[:group_id])
    @messages = @group.messages
    @groups = current_user.groups
  end

end
