Rails.application.routes.draw do
  resources :massages, only: :index
end
