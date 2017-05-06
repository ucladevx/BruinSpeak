Rails.application.routes.draw do
  #devise_for :users, :controllers => { registrations: 'users/registrations' }
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks",:registrations => "users/registrations" }
  resources :pages
  resources :petitions
  resources :comments, only: [:create, :destroy]

  root 'pages#home'
  get 'explore', to: "pages#explore"
  get 'search', to: "pages#search"
  get '/users/:id', to: 'users#show', as: 'user'
  post '/signatures', to: 'signatures#create', as: 'signatures'
  get '/tag/:id', to: 'pages#tag', as: 'tag'
end
