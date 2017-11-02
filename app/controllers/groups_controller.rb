class GroupsController < ApplicationController

  def new
    @group = Group.new
  end
  def create
    @group = Group.new(create_group)
    if @group.save
      redirect_to root_path, notice:"グループの作成に成功しました"
    else
      render 'new'
    end
  end
  def edit
  end
  def update
  end

  private
  def create_group
    params.require(:group).permit(:name, user_ids: [])
  end
end
