Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/' => "pages#home"

  namespace :api do
    resources :boards, only: [:index, :show, :create, :update, :destroy] do
      resources :columns, only: [:index, :show, :create, :update, :destroy] do
        resources :cards, only: [:index, :show, :create, :update, :destroy]
      end
    end
  end
end
