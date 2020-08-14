import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'

import graphqlServer from './graphql'
import routes from './routes'
import { connect } from './db'

const app = express()
const { NODE_ENV, PORT = 3000 } = process.env
const isProduction = NODE_ENV === 'production'

/**
 * Middleware Declarations
 */

// cors middleware
app.use((_, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

// body parser and helmet middleware
app.use(helmet(!isProduction && { contentSecurityPolicy: false }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// GraphQL middleware
graphqlServer.applyMiddleware({ app })

// REST API routes middleware
app.use(routes)

// Error Handler
app.use(
  // eslint-disable-next-line no-unused-vars
  (error, request, response, next) => response.status(500).json({
    message: 'Internal server error',
    error: isProduction ? null : error
  })
)

connect('mongodb://localhost:27017/three60')
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Server is listening on port ${PORT}`)
      console.info(`GraphQL endpoint is ${graphqlServer.graphqlPath}`)
    })
  })
  .catch((err) => console.info('Error connecting to Mongo: ', err))

export default app
