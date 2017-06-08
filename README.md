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

# Hosting

Hosting is provided through Heroku. Once the correct remote is set up, simply use "git push heroku master" to push the product to production.

To run commands on heroku, use `heroku run command-to-run`.

Use the heroku dashboard to configure database and environment variables.

Use the Figaro gem to push environment secrets to Heroku.

Image hosting is provided through AWS.

To receive a list of environment variables, as well as a list of Heroku, AWS, and email credentials, contact a previous administrator.

# Additional Commands:

View all available routes:
`$ rails routes`
