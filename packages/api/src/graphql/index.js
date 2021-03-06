import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'

import typeDefs from './schema.graphql'
import resolvers from './resolvers'
import middlewares from './middlewares'
import { models } from '../db'

const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
const schemaWithMiddleware = applyMiddleware(schema, ...middlewares)

const graphqlServer = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({ req }) => ({
    request: req,
    isProduction,
    models,
  }),
  debug: false,
  playground: true,
  introspection: true
});

export default graphqlServer
