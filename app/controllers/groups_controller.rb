class GroupsController < ApplicationController

  def index
    @user = current_user
    @groups = current_user.groups
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice:"グループの作成に成功しました"
    else
      render 'new'
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to root_path, notice:"グループを編集しました"
    else
      render 'edit'
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end
end
