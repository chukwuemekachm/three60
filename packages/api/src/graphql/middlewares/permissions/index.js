import { isAuthenticated } from './rules'

const permissions = {
  Query: {
    me: isAuthenticated,
    getTodos: isAuthenticated,
    getSingleTodo: isAuthenticated,
    getNotes: isAuthenticated,
    getSingleNote: isAuthenticated
  },
  Mutation: {
    createTodo: isAuthenticated,
    updateTodo: isAuthenticated,
    deleteTodo: isAuthenticated,
    createNote: isAuthenticated,
    updateNote: isAuthenticated,
    deleteNote: isAuthenticated
  }
}

export default permissions
