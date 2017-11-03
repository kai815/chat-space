class GroupsController < ApplicationController

  def index
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
    group_find
  end

  def update
    group_find
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

  def group_find
    @group = Group.find(params[:id])
  end


end
