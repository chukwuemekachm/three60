import { ApolloError } from 'apollo-server-core'

export default class NotFoundError extends ApolloError {
  constructor(message) {
    super(message, 'RESOURCE_NOT_FOUND')

    Object.defineProperty(this, 'name', { value: 'NotFoundError' })
  }
}
