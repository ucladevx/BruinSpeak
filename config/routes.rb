Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'users/registrations' }
  resources :pages
  resources :petitions
  root 'pages#home'
  get 'explore', to: "pages#explore"
end
