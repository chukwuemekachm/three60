import Validator from 'validatorjs'
import { UserInputError } from 'apollo-server-core'

export const validationMessage = 'Some field(s) are failing validation'

export async function validatePayload({ payload, schema }) {
  const validator = new Validator(payload, schema)
  const fails = await validator.fails()
  if (fails) {
    const errors = validator.errors.all()
    throw new UserInputError(validationMessage, errors)
  }
  return true
}

export * from './schemas/user_schemas'
export * from './schemas/todo_schemas'
export * from './schemas/note_schemas'
export * from './schemas/link_folder_schemas'
export * from './schemas/link_schemas'
export default validatePayload
