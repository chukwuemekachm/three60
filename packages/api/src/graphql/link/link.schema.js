import { gql } from 'apollo-server-express'

export const linkTypeDefs = gql`
  input CreateLinkInput {
    name: String
    url: String!
    folderId: ID!
  }

  input UpdateLinkInput {
    name: String
    url: String
    folderId: ID
  }

  input FetchLinksInput {
    name: String
    url: String
    folderId: ID
  }

  input FetchSingleLinkInput {
    id: ID
    name: String
    url: String
    folderId: ID
  }

  type Link {
    id: ID!
    name: String
    url: String!
    folder: LinkFolder!
    owner: User!
    createdAt: String!
    updateAt: String!
  }

  extend type Query {
    getLinks(input: FetchLinksInput): [Link!]!
    getSingleLink(input: FetchSingleLinkInput): Link!
  }

  extend type Mutation {
    createLink(input: CreateLinkInput!): Link!
    updateLink(id: ID!, input: UpdateLinkInput!): Link!
    deleteLink(id: ID!): ID!
  }
`
