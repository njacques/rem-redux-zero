Rails.application.routes.draw do
  root to: 'site#index'

  resources :users, only: :create do
    collection do
      post 'confirm'
      post 'login'
    end
  end

  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :create, :destroy, :update]
    end
  end
end
