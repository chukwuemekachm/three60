import { gql } from 'apollo-server-express'

import { userTypeDefs } from './user'

const typeDefs = gql`
  type Tag {
    title:  String!
    color: String
  }

  type Query {
    info: String!
  }

  type Mutation {
    info: String!
  }
`

export default [typeDefs, userTypeDefs]
