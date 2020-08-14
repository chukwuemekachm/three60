import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    info: String!
  }
`

export default [typeDefs]
