class GroupsController < ApplicationController

  def new
    @group = Group.new
  end
  def create
    Group.create(create_group)
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
