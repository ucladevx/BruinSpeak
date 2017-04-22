Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'users/registrations' }
  resources :pages
  post '/petitions', to: "petitions#create"
  get '/petitions/new', to: "petitions#new"
  root 'pages#home'
end
