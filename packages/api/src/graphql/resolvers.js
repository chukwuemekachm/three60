import merge from 'lodash/merge'

import { userResolvers } from './user'
import { todoResolvers } from './todo'
import { noteResolvers } from './note'

const Query = {
  info: () => 'three60 is still a work in progress'
}

const Mutation = {}

const resolvers = { Query, Mutation }

export default merge(
  {},
  resolvers,
  userResolvers,
  todoResolvers,
  noteResolvers
)
