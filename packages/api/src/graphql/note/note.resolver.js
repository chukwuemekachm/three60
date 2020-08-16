import uniqBy from 'lodash/uniqBy'

import { validatePayload, createNoteSchema, updateNoteSchema } from '../../validators'
import DuplicateInputError from '../../custom_errors/DuplicateInputError'
import NotFoundError from '../../custom_errors/NotFoundError'
import {
  manageUserTags, getItemOwner, deleteResource, getResource, getSingleResource
} from '../shared'

async function createNote(_, { input }, { user, models }) {
  await validatePayload({ payload: input, schema: createNoteSchema })

  const noteExists = await models.Note.findOne({ userId: user.id, title: input.title }).exec()

  if (!noteExists) {
    const {
      title, content, tags
    } = input;
    const note = await models.Note.create({
      title, content, tags, userId: user.id
    })

    manageUserTags(user, tags, models)

    return note
  }

  throw new DuplicateInputError(`You already have a note ${input.title}`)
}

async function updateNote(_, { id, input }, { user, models }) {
  await validatePayload({ payload: input, schema: updateNoteSchema })

  const note = await models.Note.findById(id).exec()

  if (note && String(note.userId) === String(user.id)) {
    const noteTitleExists = await models.Note
      .findOne({ userId: user.id, title: input.title }).exec()

    if (noteTitleExists && String(note.id) !== String(id)) {
      throw new DuplicateInputError(`You already have a note ${input.title}`)
    }

    const {
      title, content, tags
    } = input;

    const inputToUpdate = {}

    if (title) inputToUpdate.title = title
    if (content) inputToUpdate.content = content

    if (Array.isArray(tags) && tags[0]) {
      inputToUpdate.tags = uniqBy([...tags, ...note.tags], 'title')
    }

    const updatedNote = await models.Note
      .findByIdAndUpdate(id, inputToUpdate, { new: true }).exec()

    manageUserTags(user, tags, models)

    return updatedNote
  }

  throw new NotFoundError('Note not found')
}

export const noteResolvers = {
  Query: {
    getNotes: getResource('Note'),
    getSingleNote: getSingleResource('Note')
  },
  Mutation: {
    createNote,
    updateNote,
    deleteNote: deleteResource('Note')
  },
  Note: {
    owner: getItemOwner
  }
}
