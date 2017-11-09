class PagesController < ApplicationController
  def home
    @petitions = Petition.trending().paginate(page: params[:page], per_page: 6)
    @top_petitions = Petition.where(public: true).limit(3).trending()
    @users_count = User.count()
    @tags = ActsAsTaggableOn::Tag.all.order(taggings_count: :desc).limit(15)
    respond_to do |format|
      format.html
      format.js
    end
  end

  def explore
    @tags = ActsAsTaggableOn::Tag.all.order(taggings_count: :desc).limit(15)
    @petitions = Petition.where(public: true).trending().paginate(page: params[:petitions_page], per_page: 6)
    @victories = Petition.where(public: true, status: "victory").order(created_at: :desc).paginate(page: params[:victories_page], per_page: 6)
    @recent = Petition.where(public: true).order(created_at: :desc).paginate(page: params[:recent_page], per_page: 6)
    @type = params[:type]
    if !@type
      @type = "petitions"
    end
    puts "TYPE: " + @type.to_s
    respond_to do |format|
      format.html
      format.js
    end
  end

  def tag
    @tag = ActsAsTaggableOn::Tag.find(params[:id])
    @petitions = Petition.tagged_with(@tag.name).where(public: true)
  end

  def search
    @search = params[:search]
    @search = @search.downcase
    @tags = ActsAsTaggableOn::Tag.where("lower(name) LIKE ?", "%" + @search + "%")
    @petitions = Petition.where("lower(title) LIKE ?", "%" + @search + "%")
                         .where(public: true)
                         .or(Petition.where("lower(description) LIKE ?", "%" + @search + "%"))
                         .paginate(page: params[:page], per_page: 12)
    @users = User.where("lower(first_name) LIKE ?", "%" + @search + "%")
                 .or(User.where("lower(last_name) LIKE ?", "%" + @search + "%"))
                 .or(User.where("CONCAT(LOWER(first_name), ' ', LOWER(last_name)) LIKE ?", "%" + @search + "%"))
                 .paginate(page: params[:page], per_page: 12)
  end

  def impact
  end

  def about
  end

  def contact
  end

  def terms
  end

  def privacy
  end
end
