import { isAuthenticated } from './rules';

const permissions = {
  Query: {
    me: isAuthenticated,
    getTodos: isAuthenticated,
    getTodo: isAuthenticated
  },
  Mutation: {
    createTodo: isAuthenticated,
    updateTodo: isAuthenticated
  }
}

export default permissions
