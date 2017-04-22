# BruinSpeak README

This is the main source code for BruinSpeak

Rails version: 5.0.2

Dependencies: Ruby >= 2.3.0, postgreSQL >= 9.6.2

# Deployment Instructions:

Download the project:
`$ git clone https://github.com/ucladevx/BruinSpeak`

Install gems:
`$ bundle install`

Initialize postgreSQL: This can be done through the command line, or through the Postgres app (https://postgresapp.com/)

Start postgreSQL databases: This can be done through the command line, or through the Postgres app

Install Image Magic: This can be done through the command line
`$ brew install imagemagick`

Create databases:
`$ rails db:create`

Migrate database:
`$ rails db:migrate`

Start the server:
`$ rails s`

# Additional Commands:

View all available routes:
`$ rails routes`
