source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.2'

# Use postgresql as the database for Active Record
gem 'pg', '~> 0.18'

# Use Puma as the app server
gem 'puma', '~> 3.0'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'

# Use jquery as the JavaScript library
gem 'jquery-rails'
gem 'thor', '>=0.14.4'

# Typeahead gem
gem 'twitter-typeahead-rails'

# image processing
gem 'mini_magick', '~> 4.7'

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Flexible authentication solution for Rails with Warden
gem 'devise', '~> 4.2'

gem "omniauth-google-oauth2"

#Bootstrap for navbar
gem 'bootstrap-sass', '~> 3.3', '>= 3.3.7'

#Font Awesome for icons
gem 'font-awesome-sass', '~> 4.6.2'

# file uploads
gem 'carrierwave', '~> 1.0'

# Commenting
gem 'acts_as_commentable_with_threading', '~> 2.0.1'

# Petition/post tagging
gem 'acts-as-taggable-on', '~> 4.0'

# Infinite scrolling
gem 'will_paginate', '~> 3.1.5'

#jquery on mediaquerys
gem 'modernizr-rails', '~> 2.7', '>= 2.7.1'

# Simple, Heroku-friendly Rails app configuration using ENV and a single YAML file
# Documentation: https://github.com/laserlemon/figaro
gem 'figaro', '~> 1.1'

gem 'fog-aws'

gem 'd3_rails'

gem 'chartjs-ror'

gem 'jquery-ui-rails'

group :development do

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri

  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
