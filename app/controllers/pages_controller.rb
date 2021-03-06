class PagesController < ApplicationController
  def home
    @petitions = Petition.trending().paginate(page: params[:page], per_page: 6)
    @top_petitions = Petition.where(public: true).limit(3).trending()
    @users_count = User.count()
    @tags = ActsAsTaggableOn::Tag.all.order(taggings_count: :desc).limit(4)
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
                                 .paginate(page: params[:page], per_page: 12)
    @petitions = Petition.where("lower(title) LIKE ?", "%" + @search + "%")
                         .where(public: true)
                         .or(Petition.where("lower(description) LIKE ?", "%" + @search + "%"))
                         .paginate(page: params[:page], per_page: 12)
    @users = User.where("lower(first_name) LIKE ?", "%" + @search + "%")
                 .or(User.where("lower(last_name) LIKE ?", "%" + @search + "%"))
                 .or(User.where("CONCAT(LOWER(first_name), ' ', LOWER(last_name)) LIKE ?", "%" + @search + "%"))
                 .paginate(page: params[:page], per_page: 12)
  end

  def government
    @user = User.find(params[:id])
    @petitions = Petition.trending().paginate(page: params[:page], per_page: 6)
    @members = User.where(role: 1)
    respond_to do |format|
      format.html
      format.js
    end
  end

  def searchPetitions
    @search = params[:search]
    @search = @search.downcase
    @petitions = Petition.where("lower(title) LIKE ?", "%" + @search + "%")
                         .where(public: true)
    render :json => @petitions
  end

  def searchUsers
    @search = params[:search]
    @search = @search.downcase
    @users = User.where("lower(first_name) LIKE ?", "%" + @search + "%")
                 .or(User.where("lower(last_name) LIKE ?", "%" + @search + "%"))
                 .or(User.where("CONCAT(LOWER(first_name), ' ', LOWER(last_name)) LIKE ?", "%" + @search + "%"))
    render :json => @users
  end

  def searchTags
    @search = params[:search]
    @search = @search.downcase
    @tags = ActsAsTaggableOn::Tag.where("lower(name) LIKE ?", "%" + @search + "%")
    render :json => @tags
  end

  def impact
    @data_petitions_started = {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
            label: "Number of Petitions Started",
            background_color: "rgba(0,0,0,0)",
            border_color: "rgb(255,255,255)",
            data: [3, 5, 7, 8, 10, 12, 16, 20, 28, 35, 37, 41]
        }
      ]
    }
    @data_pie_chart = {
      labels: ["Users who have signed winning petitions", "Other users"],
      datasets: [
        {
          data: [80,20],
          background_color: ["rgb(121, 154, 206)", "rgb(213, 222, 237)"]
        }
      ]
    }
    @data_petitions_signed = {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
            label: "Number of Petitions Signed",
            background_color: "rgba(0,0,0,0)",
            border_color: "rgb(47, 51, 58)",
            data: [22, 42, 80, 104, 134, 189, 213, 221, 218, 248, 254, 259]
        }
      ]
    }
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
