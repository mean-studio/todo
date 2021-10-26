import express from "express";
import { todo, todos } from './routes/todo';
import { todoList, todoLists } from './routes/todo_list';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./open-api";
import { ErrorHandler } from './helpers/error_handling';

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/todos', todos)
app.use('/todo', todo)
app.use('/todo_lists', todoLists)
app.use('/todo_list', todoList)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(ErrorHandler)
app.listen(3030, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:3030`);

});
app.get('/', (req, res) => res.send('ok'))

