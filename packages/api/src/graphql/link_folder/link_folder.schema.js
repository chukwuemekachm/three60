import { gql } from 'apollo-server-express'

export const linkFolderTypeDefs = gql`
  input CreateLinkFolderInput {
    name: String!
    description: String
  }

  input UpdateLinkFolderInput {
    name: String
    description: String
  }

  input FetchLinkFoldersInput {
    name: String
    description: String
  }

  input FetchSingleLinkFolderInput {
    id: ID
    name: String
    description: String
  }

  type LinkFolder {
    id: ID!
    name: String!
    description: String
    owner: User!
    links: [Link!]!
    createdAt: String!
    updateAt: String!
  }

  extend type Query {
    getLinkFolders(input: FetchLinkFoldersInput): [LinkFolder!]!
    getSingleLinkFolder(input: FetchSingleLinkFolderInput): LinkFolder!
  }

  extend type Mutation {
    createLinkFolder(input: CreateLinkFolderInput!): LinkFolder!
    updateLinkFolder(id: ID!, input: UpdateLinkFolderInput!): LinkFolder!
    deleteLinkFolder(id: ID!): ID!
  }
`
