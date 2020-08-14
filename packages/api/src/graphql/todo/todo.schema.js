import { gql } from 'apollo-server-express'

export const todoTypeDefs = gql`
  enum TodoStatus {
    BACKLOG
    IN_PROGRESS
    FINISHED
    TRASH
  }

  enum CreateTodoStatus {
    BACKLOG
    IN_PROGRESS
  }

  enum TodoItemStatus {
    BACKLOG
    IN_PROGRESS
    FINISHED
  }

  input CreateTodoItemInput {
    title: String!
  }

  input UpdateTodoItemInput {
    title: String
    status: String
  }

  input CreateTodoInput {
    title: String!
    description: String
    status: CreateTodoStatus
    items: [CreateTodoItemInput]
    tags: [CreateTagInput]
  }

  input UpdateTodoInput {
    title: String
    description: String
    status: TodoStatus
    items: [CreateTodoItemInput]
    tags: [CreateTagInput]
  }

  input FetchSingleTodoInput {
    id: String
    title: String
    description: String
    status: TodoStatus
  }

  type TodoItem {
    title: String!
    status: TodoItemStatus!
  }

  type Todo {
    id: ID!
    title: String!
    description: String
    status: TodoStatus!
    items: [TodoItem]!
    tags: [Tag]!
    owner: User!
  }

  extend type Query {
    getTodos(input: FetchSingleTodoInput): [Todo]!
    getTodo(input: FetchSingleTodoInput): Todo
  }

  extend type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(todoId: String!, input: UpdateTodoInput): Todo!
    deleteTodo(todoId: String!): String!
  }
`
