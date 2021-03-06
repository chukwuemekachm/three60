import mongoose from 'mongoose'

import User from './graphql/user/user.model'
import Link from './graphql/link/link.model'
import LinkFolder from './graphql/link_folder/link_folder.model'
import Note from './graphql/note/note.model'
import Todo from './graphql/todo/todo.model'

const { POOL_SIZE = 10, DB_URI } = process.env

export const models = {
  User,
  Link,
  LinkFolder,
  Note,
  Todo
}

export function connect() {
  return mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    poolSize: POOL_SIZE,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
}
