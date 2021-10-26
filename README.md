# Sample todo list app

This app lets you to create and organise todos as list


The simplest way to get a local environment is to  to run 
`docker-compose`
command in root directory. It will automatically pull necessary images and spin local enviroment.

Apllication follows standart REST API fashion.


# Node JS Server (Simple)

## Session secret

Before running the server, you must generate a session secret key and store it in an environment variable or the `.env` file.

e.g. `export SESSION_SECRET=$(openssl rand -base64 20)`

## Running the server

To start the local development server:
`npm start`

To start the node server in local mode which points towards mock backend
`npm run local`

When running the repo locally for the first time you will need to run `npm install` in both the root directory and the `mock-backend` directory.

## Debugging in VSCODE
To Debug in VSCODE run `npm run debug` then go to the debug console and ensure `attach process by id` is present in the dropdown in the top left (If not select `add configuration` and save the file that opens). Then click the dropdown and select `attach process by id` and select the relevant choice in the new dropdown that appears.

# Config

Configuration is now done via the yaml.js file in the config folder.

- CONFIG_LOCATION is a env var that can be changed to load in a yml in a different location.

if we want to override the backend url then a env variable BACKEND_URL need to be passed before npm start so that the value is used instead of the url from the application yml. ex: BACKEND_URL="localhost:4000" npm start

# Docker (Advanced)

To create image:
`docker build -t nhs/node-web-app`

To list all docker images:
`docker images`

Running the image:
`docker run -p 3000:3000 -d nhs/node-web-app`

# Unit Testing

We are using Mocha for unit testing.

To run the unit tests:
`npm run test`

We are using istanbul to generate a code coverage report.

To run the tests and generate a code coverage report:
`npm run coverage` or  `npm run coverage-report`

# Git

We are using the Git flow method for development to keep the develop branch clean, feature branches should be used for
any development work, the branch should reflect the JIRA ticket number you are.
working on. e.g. feature/NJA-0000-description

# Swagger

To view Swagger documentation, when   backend is runnings you can visit:
`http://localhost:3030/api-docs`
Unfortunately swagger documentation is not completed

# Cypress end-to-end testing

There is no test implemented yet 
 

# URLS

### Todo
- /todos  GET
  Gets list of all availiable 
- /todo/{id}  GET
  Gets details of given todo item 
- /todo/ POST
  creates new todo item. requires following json object 
  {"title":"Some title text"}
- /todo/{id} PUT
  Updates given todo item. requires following json object 
  {"title":"Some title text"}
- /todo/{id} DELETE
  Deletes given todo item. No body required

### TodoList
- /todo_lists  GET
  Gets list of all availiable  todolist
- /todo_list/{id}  GET
  Gets details of given todo lists including todo items 
- /todo_list/ POST
  creates new todo list. requires following json object 
  {"title":"Some title text"}
- /todo_list/{id} PUT
  Updates given todo list. requires following json object 
  {"title":"Some title text"}
- /todo_list/{id} DELETE
  Deletes given todo list. No body required
- /todo_list/{listId}/{todoId} PUT
  Adds given todo item to given todo list.  
- /todo_list/{listId}/{todoId} DELETE
  Removes given todo item to given todo list.  