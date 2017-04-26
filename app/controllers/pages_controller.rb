class PagesController < ApplicationController
  def home
    @petitions = Petition.all
  end

  def explore
  end

  def search
    @search = params[:search]
    @petitions = Petition.where("lower(title) LIKE ?", "%" + @search.downcase + "%")
  end
end
