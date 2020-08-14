import { gql } from 'apollo-server-express'

import { userTypeDefs } from './user'
import { todoTypeDefs } from './todo'

const typeDefs = gql`
  input CreateTagInput {
    title: String!
    color: String
  }

  input UpdateTagInput {
    title: String
    color: String
  }

  type Tag {
    title: String!
    color: String
  }

  type Query {
    info: String!
  }

  type Mutation {
    info: String
  }
`

export default [typeDefs, userTypeDefs, todoTypeDefs]
