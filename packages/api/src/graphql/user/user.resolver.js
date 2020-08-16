import bcrypt from 'bcryptjs'
import { AuthenticationError } from 'apollo-server-core'

import { generateToken } from '../../helpers/jwt_helper'
import { validatePayload, signUpSchema, loginSchema } from '../../validators'
import DuplicateInputError from '../../custom_errors/DuplicateInputError'
import { getUserSubCollection } from '../shared'

async function signUp(_, { input }, { models }) {
  await validatePayload({ payload: input, schema: signUpSchema })

  const userExists = await models.User.exists({ email: input.email })

  if (!userExists) {
    const {
      email, firstName, lastName, password
    } = input;
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await models.User.create({
      email, firstName, lastName, password: passwordHash
    })
    const token = generateToken({ id: user.id, email })

    return { token, user }
  }

  throw new DuplicateInputError(`User with email ${input.email} exists`)
}

async function login(_, { input }, { models }) {
  await validatePayload({ payload: input, schema: loginSchema })

  const user = await models.User.findOne({ email: input.email }).exec()

  if (user) {
    const { email, password } = user;
    const isValidPassword = await bcrypt.compare(input.password, password)

    if (isValidPassword) {
      const token = generateToken({ id: user.id, email })

      return { token, user }
    }
  }

  throw new AuthenticationError('Invaild credentials')
}

async function getUserInfo(_, __, { models, user }) {
  const userInfo = await models.User.findById(user.id).exec()

  return userInfo
}

export const userResolvers = {
  Query: {
    me: getUserInfo
  },
  Mutation: {
    signUp,
    login
  },
  User: {
    todos: getUserSubCollection('Todo'),
    notes: getUserSubCollection('Note'),
    linkFolders: getUserSubCollection('LinkFolder'),
    links: getUserSubCollection('Link')
  }
}
