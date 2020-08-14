import { gql } from 'apollo-server-express'

export const userTypeDefs = gql`
  enum UserStatus {
    IN_ACTIVE
    ACTIVE
  }

  enum UserRole {
    USER
    ADMIN
  }

  input UserSignUpInput {
    email: String!
    password: String!
    confirmPassword: String!
    firstName: String!
    lastName: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type UserAuthResponse {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    tags: [Tag]!
    avatarURL: String
    status: UserStatus!
    role: UserRole!
    todos: [Todo]!
    createdAt: String!
    updateAt: String!
  }

  extend type Query {
    me: User!
  }

  extend type Mutation {
    signUp(input: UserSignUpInput!): UserAuthResponse!
    login(input: UserLoginInput!): UserAuthResponse!
  }
`
