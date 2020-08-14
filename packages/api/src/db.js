import mongoose from 'mongoose'

import User from './graphql/user/user.model'
import Link from './graphql/link/link.model'
import LinkFolder from './graphql/link_folder/link_folder.model'
import Note from './graphql/note/note.model'
import Todo from './graphql/todo/todo.model'

export const models = {
  User,
  Link,
  LinkFolder,
  Note,
  Todo
}

export function connect(URL) {
  return mongoose.connect(URL, {
    useNewUrlParser: true,
    poolSize: 10,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
}
