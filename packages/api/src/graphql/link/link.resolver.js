import uniqBy from 'lodash/uniqBy'

import { validatePayload, createLinkSchema, updateLinkSchema } from '../../validators'
import DuplicateInputError from '../../custom_errors/DuplicateInputError'
import NotFoundError from '../../custom_errors/NotFoundError'
import {
  getItemOwner, deleteResource, getResource, getSingleResource, manageUserTags
} from '../shared'

async function createLink(_, { input }, { user, models }) {
  await validatePayload({ payload: input, schema: createLinkSchema })

  const folderExists = await models.LinkFolder.findById(input.folderId).exec()

  if (!folderExists || String(folderExists.userId) !== String(user.id)) {
    throw new NotFoundError('Folder not found')
  }

  const linkExists = await models.Link
    .findOne({ userId: user.id, url: input.url }).exec()

  if (!linkExists) {
    const {
      name, url, tags, folderId
    } = input;
    const link = await models.Link.create({
      name, url, tags, folderId, userId: user.id
    })

    manageUserTags(user, tags, models)

    return link
  }

  throw new DuplicateInputError(`You already have a link ${input.url}`)
}

async function updateLink(_, { id, input }, { user, models }) {
  await validatePayload({ payload: input, schema: updateLinkSchema })

  const link = await models.Link.findById(id).exec()

  if (link && String(link.userId) === String(user.id)) {
    const linkUrlExists = await models.Link
      .findOne({ userId: user.id, url: input.url }).exec()

    if (linkUrlExists && String(link.id) !== String(id)) {
      throw new DuplicateInputError(`You already have a link ${input.url}`)
    }

    const {
      name, url, tags, folderId
    } = input;

    if (folderId) {
      const folderExists = await models.LinkFolder.findById(input.folderId).exec()

      if (!folderExists || String(folderExists.userId) !== String(user.id)) {
        throw new NotFoundError('Folder not found')
      }
    }

    const inputToUpdate = {}

    if (name) inputToUpdate.name = name
    if (url) inputToUpdate.url = url
    if (folderId) inputToUpdate.folderId = folderId

    if (Array.isArray(tags) && tags[0]) {
      inputToUpdate.tags = uniqBy([...tags, ...link.tags], 'title')
    }

    const updatedLink = await models.Link
      .findByIdAndUpdate(id, inputToUpdate, { new: true }).exec()

    manageUserTags(user, tags, models)

    return updatedLink
  }

  throw new NotFoundError('Link not found')
}

async function getLinkFolder(root, __, { models }) {
  const folder = await models.LinkFolder.findById(root.folderId).exec()

  return folder
}

export const linkResolvers = {
  Query: {
    getLinks: getResource('Link'),
    getSingleLink: getSingleResource('Link')
  },
  Mutation: {
    createLink,
    updateLink,
    deleteLink: deleteResource('Link')
  },
  Link: {
    owner: getItemOwner,
    folder: getLinkFolder
  }
}
