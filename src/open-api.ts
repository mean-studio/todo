export default {
  "openapi": "3.0.1",
  "info": {
    "title": "Datamir Test Api Server",
    "description": "This is simple restful api server to demostrate developers capabilities",
    "termsOfService": "http://mean.studio/terms/",
    "contact": {
      "email": "denis@mean.studio"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://localhost:3030/"
    },
  ],
  "tags": [
    {
      "name": "Todo",
      "description": "Tasks related to todo items",
    },
    {
      "name": "Todo list",
      "description": "Task related to todo lists",
    }
  ],
  "paths": {
    "/todo": {
      "put": {
        "tags": ["task"],
        "summary": "Update an existing todo",
        "operationId": "updateTodo",
        "requestBody": {
          "description": "Todo object that needs to be added to the system",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/todo"
              }
            }
          },
          "required": true
        },
        "responses": {
          "404": {
            "description": "Record not found",
            "content": {}
          },
          "405": {
            "description": "Empty content",
            "content": {}
          }
        },
        "x-codegen-request-body-name": "body"
      },
      "post": {
        "tags": ["task"],
        "summary": "Add a new pet to the store",
        "operationId": "addPet",
        "requestBody": {
          "description": "Pet object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Pet"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/Pet"
              }
            }
          },
          "required": true
        },
        "responses": {
          "405": {
            "description": "Invalid input",
            "content": {}
          }
        },
        "security": [
          {
            "petstore_auth": ["write:pets", "read:pets"]
          }
        ],
        "x-codegen-request-body-name": "body"
      }
    },
    "/todos": {
      "get": {
        "tags": ["Todo"],
        "summary": "List all todo items",
        "description": "Multiple status values can be provided with comma separated strings",
        "operationId": "getAllTodos",
        "parameters": [
          {
            "description": "Status values that need to be considered for filter",
            "schema": {
              "type": "string",
            }
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {

              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/todo"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid status value",
            "content": {}
          }
        },
      }
    },

    "/todo/{id}": {
      "get": {
        "tags": ["todo"],
        "summary": "Find todo by ID",
        "description": "Returns a single todo item",
        "operationId": "getTodo",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of todo to return",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {

              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/todo"
                }
              }
            }
          },
          "400": {
            "description": "Invalid ID supplied",
            "content": {}
          },
          "404": {
            "description": "Record not fouund",
            "content": {}
          }
        },

      },
      "post": {
        "tags": ["task"],
        "summary": "Updates a pet in the store with form data",
        "operationId": "updatePetWithForm",
        "parameters": [
          {
            "name": "petId",
            "in": "path",
            "description": "ID of pet that needs to be updated",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Updated name of the pet"
                  },
                  "status": {
                    "type": "string",
                    "description": "Updated status of the pet"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "405": {
            "description": "Invalid input",
            "content": {}
          }
        },
        "security": [
          {
            "petstore_auth": ["write:pets", "read:pets"]
          }
        ]
      },
      "delete": {
        "tags": ["task"],
        "summary": "Deletes a pet",
        "operationId": "deletePet",
        "parameters": [
          {
            "name": "api_key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "petId",
            "in": "path",
            "description": "Pet id to delete",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid ID supplied",
            "content": {}
          },
          "404": {
            "description": "Pet not found",
            "content": {}
          }
        },
        "security": [
          {
            "petstore_auth": ["write:pets", "read:pets"]
          }
        ]
      }
    },

  },
  "components": {
    "schemas": {
      "Todo": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
            "description": "Todo id",
          },
          "title": {
            "type": "string"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "description": "Todo Status",
          },
          "completed": {
            "type": "boolean",
            "default": false,
            "description": "Todo Status",
            "enum": ["false", "true"]
          }
        },
      },
      "Category": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          }
        },
        "xml": {
          "name": "Category"
        }
      },
    },
    "securitySchemes": {
      "petstore_auth": {
        "type": "oauth2",
        "flows": {
          "implicit": {
            "authorizationUrl": "http://petstore.swagger.io/oauth/dialog",
            "scopes": {
              "write:pets": "modify pets in your account",
              "read:pets": "read your pets"
            }
          }
        }
      },
      "api_key": {
        "type": "apiKey",
        "name": "api_key",
        "in": "header"
      }
    }
  }
}
