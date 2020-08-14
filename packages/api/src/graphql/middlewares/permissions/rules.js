import { AuthenticationError } from 'apollo-server-core'

import { decodeToken } from '../../../helpers/jwt_helper'

export function isAuthenticated(resolve, parent, args, context, info) {
  try {
    const { id, email } = decodeToken(context)
    if (!id) {
      throw new AuthenticationError('Authentication is needed for this operation')
    }
    context.user = { id, email }
    return resolve(parent, args, context, info)
  } catch (error) {
    throw new AuthenticationError('Authentication is needed for this operation')
  }
}
