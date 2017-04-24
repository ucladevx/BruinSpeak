class PagesController < ApplicationController
  def home
    @petitions = Petition.all
  end
end
