setup:
	bundle install
	rails db:drop
	rails db:create
	rails db:schema:load
	rails db:migrate
	rails db:seed

server:
	bundle exec rails server -p 3001

test:
	bundle exec rspec
