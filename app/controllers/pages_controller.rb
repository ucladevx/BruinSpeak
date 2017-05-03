class PagesController < ApplicationController
  def home
    @petitions = Petition.all
    @top_petitions = Petition.all.limit(3)
  end

  def explore
      @petitions = Petition.all
  end

  def search
    @search = params[:search]
    @petitions = Petition.where("lower(title) LIKE ?", "%" + @search.downcase + "%")
  end
end
