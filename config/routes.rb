Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks",:registrations => "users/registrations" }
  resources :pages
  resources :petitions
  resources :comments, only: [:create, :destroy]

  root 'pages#home'
  get 'explore', to: "pages#explore"
  get 'search', to: "pages#search"
  get 'about', to: "pages#about"
  get 'contact', to: "pages#contact"
  get 'terms', to: "pages#terms"
  get 'privacy', to: "pages#privacy"
  get '/users/:id', to: 'users#show', as: 'user'
  post '/users/:id/role', to: 'users#update_role', :constraints => { :only_ajax => true }
  post '/petitions/:id/public', to: 'petitions#toggle_public', :constraints => { :only_ajax => true }
  post '/petitions/:id/victory', to: 'petitions#change_to_victory', as: 'victory', :constraints => { :only_ajax => true }
  post '/petitions/:id/closed', to: 'petitions#change_to_closed', as: 'closed', :constraints => { :only_ajax => true }
  post '/petitions/:id/active', to: 'petitions#change_to_active', as: 'active', :constraints => { :only_ajax => true }

  post '/signatures', to: 'signatures#create', :constraints => { :only_ajax => true }
  delete '/signatures.:user_id', to: 'signatures#destroy', :constraints => { :only_ajax => true }
  get '/tag/:id', to: 'pages#tag', as: 'tag'
  devise_scope :user do
    get '/user/remove_picture', to: 'users/registrations#remove_picture', as: 'remove_picture'
  end
end
