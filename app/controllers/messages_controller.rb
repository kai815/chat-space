class MessagesController < ApplicationController
  before_action :get_groups_messages, only: [:index, :create]

  def index
    @message = Message.new
    @messages = @group.messages.order("id ASC")
    respond_to do |format|
      format.html
      format.json
    end
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

  def destroy
    @message = Message.find(params[:id])
    @message.destroy if @message.user_id == current_user.id
    redirect_to group_messages_path(params[:group_id]), notice: 'メッセージを削除しました'
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(group_id: params[:group_id], user_id: current_user.id)
  end

  def get_groups_messages
    @group = Group.find(params[:group_id])
    @groups = current_user.groups
  end

end
