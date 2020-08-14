import { ApolloError } from 'apollo-server-core'

export default class DuplicateInputError extends ApolloError {
  constructor(message) {
    super(message, 'DUPLICATE_INPUT_VALUE')

    Object.defineProperty(this, 'name', { value: 'DuplicateInputError' })
  }
}
