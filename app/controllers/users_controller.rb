class UsersController < ApplicationController

  def edit
    @user = current_user
  end

  def update
    user = User.find(params[:id])
    user.update(user_params) if current_user.id == user.id

    redirect_to  "/"
  end

  private

  def user_params
    params[:user].permit(:name, :email)
  end

end
