Rails.application.routes.draw do
  root to: redirect('/events')

  get 'login', to: 'site#index'
  get 'events', to: 'site#index'
  get 'events/new', to: 'site#index'
  get 'events/:id', to: 'site#index'
  get 'events/:id/edit', to: 'site#index'

  resources :users, only: :create do
    collection do
      post 'login'
      post 'valid_token'
    end
  end

  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :show, :create, :destroy, :update]
    end
  end
end
