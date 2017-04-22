Rails.application.routes.draw do
  devise_for :users
  resources :pages
  post '/petitions', to: "petitions#create"
  get '/petitions/new', to: "petitions#new"
  root 'pages#home'
end
