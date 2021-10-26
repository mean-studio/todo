import { Router } from 'express';
import { selectAlltodoLists, selectTodoLists, createTodoList, updateTodoList, addItemToTodoList, removeItemFromTodoList, selectTodoListsItems } from '../sql_scripts/todo_lists';

import { dbService } from '../services/db';
import { Errors } from './error_messages';
export const todoLists = Router()
export const todoList = Router()
todoLists.get('/', (req, res, next) => {
  dbService.execute(selectAlltodoLists).then(({ rows }) => res.json(rows)).catch(e => next(e))
})
todoLists.get('/:id', (req, res, next) => {
  const { params: { id } } = req
  dbService.execute(selectTodoLists, id).then(async ({ rows, rowCount }) => {
    if (rowCount < 1)
      return res.status(404).send({ code: 404, message: Errors.NOT_FOUND })
    const result = rows[0]
    const { rows: items } = await dbService.execute(selectTodoListsItems, id)
    result.items = items
    res.json(result)
  }).catch(e => next(e))
})

todoList.post('/', (req, res, next) => {
  const { body: { title } } = req
  if (!title) res.status(406).send({ code: 406, message: Errors.EMPTY_CONTENT })
  dbService.execute(createTodoList, title).then(({ rows }) => {
    res.json(rows[0])
  }).catch(e => next(e))
})
todoList.put('/:id', (req, res, next) => {
  const { body: { title }, params: { id } } = req
  if (!title) res.status(406).send({ code: 406, message: Errors.EMPTY_CONTENT })
  dbService.execute(updateTodoList, id, title).then(({ rows, rowCount }) => {
    if (rowCount < 1)
      return res.status(404).send({ code: 404, message: Errors.NOT_FOUND })
    res.json(rows[0])
  }).catch(e => next(e))

})
todoList.delete('/:id', (req, res, next) => {
  const { params: { id } } = req
  dbService.execute(updateTodoList, id).then(({ rowCount }) => {
    if (rowCount < 1)
      res.status(404).send({ code: 404, message: Errors.NOT_FOUND })
    res.status(204).send()
  }).catch(e => next(e))
})
todoList.put('/:listId/:itemID', (req, res, next) => {
  const { params: { listId, itemID } } = req
  dbService.execute(addItemToTodoList, listId, itemID).then(({ rows, rowCount }) => {
    if (rowCount < 1)
      res.status(404).send({ code: 404, message: Errors.NOT_FOUND })
    res.json(rows[0])
  }).catch(e => next(e))
})
todoList.delete('/:listId/:itemID', (req, res, next) => {
  const { params: { listId, itemID } } = req
  dbService.execute(removeItemFromTodoList, listId, itemID).then(({ rowCount }) => {
    if (rowCount < 1)
      res.status(404).send({ code: 404, message: Errors.NOT_FOUND })
    res.status(204).send()
  }).catch(e => next(e))
})