class PagesController < ApplicationController
  def home
    @petitions = Petition.all
  end
  def explore
  end
end
