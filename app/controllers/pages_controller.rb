class PagesController < ApplicationController
  def home
    @petitions = Petition.trending().paginate(page: params[:page], per_page: 8)
    @top_petitions = Petition.all.limit(3)
    respond_to do |format|
      format.html
      format.js
    end
  end

  def explore
    @tags = ActsAsTaggableOn::Tag.all.order(taggings_count: :desc).limit(15)
    @petitions = Petition.all
  end

  def tag
    @tag = ActsAsTaggableOn::Tag.find(params[:id])
    @petitions = Petition.tagged_with(@tag.name)
  end

  def search
    @search = params[:search]
    @petitions = Petition.where("lower(title) LIKE ?", "%" + @search.downcase + "%")
  end
end
