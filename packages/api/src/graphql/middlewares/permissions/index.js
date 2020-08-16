import { isAuthenticated } from './rules'

const permissions = {
  Query: {
    me: isAuthenticated,
    getTodos: isAuthenticated,
    getSingleTodo: isAuthenticated,
    getNotes: isAuthenticated,
    getSingleNote: isAuthenticated,
    getLinkFolders: isAuthenticated,
    getSingleLinkFolder: isAuthenticated,
    getLinks: isAuthenticated,
    getSingleLink: isAuthenticated
  },
  Mutation: {
    createTodo: isAuthenticated,
    updateTodo: isAuthenticated,
    deleteTodo: isAuthenticated,
    createNote: isAuthenticated,
    updateNote: isAuthenticated,
    deleteNote: isAuthenticated,
    createLinkFolder: isAuthenticated,
    updateLinkFolder: isAuthenticated,
    deleteLinkFolder: isAuthenticated,
    createLink: isAuthenticated,
    updateLink: isAuthenticated,
    deleteLink: isAuthenticated
  }
}

export default permissions
