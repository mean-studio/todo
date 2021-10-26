# Sample todo list app

This app lets you to create and organise todos as list


The simplest way to get a local environment is to  to run 
`docker-compose`
command in root directory. It will automatically pull necessary images and spin local enviroment.

Apllication follows standart REST API fashion.
 
 # Swagger

To view Swagger documentation, when   backend is runnings you can visit:
`http://localhost:3030/api-docs`
Unfortunately swagger documentation is not completed

# Testing

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