import uniqBy from 'lodash/uniqBy'

import { validatePayload, createTodoSchema, updateTodoSchema } from '../../validators'
import DuplicateInputError from '../../custom_errors/DuplicateInputError'
import NotFoundError from '../../custom_errors/NotFoundError'
import {
  manageUserTags, getItemOwner, deleteResource, getSingleResource, getResource,
} from '../shared'

async function createTodo(_, { input }, { user, models }) {
  await validatePayload({ payload: input, schema: createTodoSchema })

  const todoExists = await models.Todo.findOne({ userId: user.id, title: input.title }).exec()

  if (!todoExists) {
    const {
      title, description, items, status, tags
    } = input;
    const todo = await models.Todo.create({
      title, description, items, status, tags, userId: user.id
    })

    manageUserTags(user, tags, models)

    return todo
  }

  throw new DuplicateInputError(`You already have a todo ${input.title}`)
}

async function updateTodo(_, { id, input }, { user, models }) {
  await validatePayload({ payload: input, schema: updateTodoSchema })

  const todo = await models.Todo.findById(id).exec()

  if (todo && String(todo.userId) === String(user.id)) {
    const todoTitleExists = await models.Todo
      .findOne({ userId: user.id, title: input.title }).exec()

    if (todoTitleExists && String(todo.id) !== String(id)) {
      throw new DuplicateInputError(`You already have a todo ${input.title}`)
    }

    const {
      title, description, items, status, tags
    } = input;

    const inputToUpdate = {}

    if (title) inputToUpdate.title = title
    if (description) inputToUpdate.description = description
    if (status) inputToUpdate.status = status

    if (Array.isArray(items) && items[0]) {
      inputToUpdate.items = uniqBy([...items, ...todo.items], 'title')
    }
    if (Array.isArray(tags) && tags[0]) {
      inputToUpdate.tags = uniqBy([...tags, ...todo.tags], 'title')
    }

    const updatedTodo = await models.Todo
      .findByIdAndUpdate(id, inputToUpdate, { new: true }).exec()

    manageUserTags(user, tags, models)

    return updatedTodo
  }

  throw new NotFoundError('Todo not found')
}

export const todoResolvers = {
  Query: {
    getTodos: getResource('Todo'),
    getSingleTodo: getSingleResource('Todo')
  },
  Mutation: {
    createTodo,
    updateTodo,
    deleteTodo: deleteResource('Todo')
  },
  Todo: {
    owner: getItemOwner
  }
}
