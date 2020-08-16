import { gql } from 'apollo-server-express'

export const noteTypeDefs = gql`
  input CreateNoteInput {
    title: String!
    content: String
    tags: [CreateTagInput]
  }

  input UpdateNoteInput {
    title: String
    content: String
    tags: [UpdateTagInput!]
  }

  input FetchNoteInput {
    title: String
    content: String
  }

  input FetchSingleNoteInput {
    id: ID
    title: String
    content: String
  }

  type Note {
    id: ID!
    title: String!
    content: String
    tags: [Tag]!
    owner: User!
    createdAt: String!
    updateAt: String!
  }

  extend type Query {
    getNotes(input: FetchNoteInput): [Note!]!
    getSingleNote(input: FetchSingleNoteInput): Note!
  }

  extend type Mutation {
    createNote(input: CreateNoteInput!): Note!
    updateNote(id: ID!, input: UpdateNoteInput!): Note!
    deleteNote(id: ID!): ID!
  }
`
