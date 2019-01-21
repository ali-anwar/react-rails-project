# Meals/Calories Demo Project

## Backend - API (Rails)

The backend folder contains the Ruby on Rails code for the API. It uses MySQL for database. 

`cd backend` and you can:

* `make setup` to setup the environment, install dependencies, create and seed the database.
  * Uses `ruby 2.6.0`, `gem 3.0.1`, `rails 5.2.2`, and MySQL.
* `make server` to run the API server on port 3001.
  * Try it out: <http://localhost:3001>
* `make test` to run the backend tests.

## Frontend - UI (React)

The frontend folder contains the React code with end-end tests.

`cd frontend` and you can:

* `make setup` to setup the environment, and install dependencies.
  * Uses `node v11.7.0` and `npm 6.6.0`.
* `make server` to run the front-end react server on port 3000.
  * Try it out: <http://localhost:3000>
* `make test` To run the front unit and end to end tests. You can run individual tests as well:
  * `make unit-tests`
  * `make integration-tests-regular`
  * `make integration-tests-manager`
  * `make integration-tests-admin`.

**Note** that the tests need both backend and frontend servers to be running.
