import { Router } from 'express';
import { dbService } from '../services/db';
import { createTodo, deleteTodo, getAllTodos, getTodo, updateTodo, } from '../sql_scripts/todos';
import { Errors } from './error_messages';
export const todos = Router()
export const todo = Router()
todos.get('', (req, res, next) => {
  dbService.execute(getAllTodos).then(({ rows }) => res.json(rows)
  ).catch(e => next(e))
})
todo.get('/:id', (req, res, next) => {
  const { params: { id } } = req
  dbService.execute(getTodo, id).then(({ rows, rowCount }) => {
    if (rowCount < 1)
      return res.status(404).send({ code: 404, message: Errors.NOT_FOUND })
    res.json(rows[0])
  }).catch(e => next(e))
})
todo.post('/', (req, res, next) => {
  const { body: { title } } = req
  if (!title)
    return res.status(405).send({ code: 405, message: Errors.EMPTY_CONTENT })
  dbService.execute(createTodo, title).then(({ rows }) => res.json(rows[0]))
    .catch(e => next(e))
})
todo.put('/:id', (req, res, next) => {
  const { body: { title }, params: { id } } = req
  if (!title)
    return res.status(405).send({ code: 405, message: Errors.EMPTY_CONTENT })
  dbService.execute(updateTodo, id, title).then(({ rows, rowCount }) => {
    if (rowCount < 1)
      return res.status(404).send({ code: 404, message: Errors.NOT_FOUND })
    res.json(rows[0])
  }).catch(e => next(e))
})
todo.delete('/:id', (req, res, next) => {
  const { params: { id } } = req
  dbService.execute(deleteTodo, id).then(({ rowCount }) => {
    if (rowCount < 1)
      return res.status(404).send({ code: 404, message: Errors.NOT_FOUND })
    res.status(204).send()
  }).catch(e => next(e))
})