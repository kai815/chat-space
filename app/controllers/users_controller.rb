class UsersController < ApplicationController

  def edit
    @user = current_user
  end

  def update
    user = User.find(params[:id])
    if user && current_user.id == user.id
       if user.update(user_params)
         redirect_to root_path
       else
        redirect_to(:back)
       end
    end
  end

  private

  def user_params
    params[:user].permit(:name, :email)
  end

end