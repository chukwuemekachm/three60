import { isAuthenticated } from './rules'

const permissions = {
  Query: {
    me: isAuthenticated,
    getTodos: isAuthenticated,
    getTodo: isAuthenticated
  },
  Mutation: {
    createTodo: isAuthenticated,
    updateTodo: isAuthenticated,
    deleteTodo: isAuthenticated
  }
}

export default permissions
