import { validatePayload, createLinkFolderSchema, updateLinkFolderSchema } from '../../validators'
import DuplicateInputError from '../../custom_errors/DuplicateInputError'
import NotFoundError from '../../custom_errors/NotFoundError'
import {
  getItemOwner, deleteResource, getResource, getSingleResource
} from '../shared'

async function createLinkFolder(_, { input }, { user, models }) {
  await validatePayload({ payload: input, schema: createLinkFolderSchema })

  const linkFolderExists = await models.LinkFolder
    .findOne({ userId: user.id, name: input.name }).exec()

  if (!linkFolderExists) {
    const { name, description } = input;
    const linkFolder = await models.LinkFolder.create({
      name, description, userId: user.id
    })

    return linkFolder
  }

  throw new DuplicateInputError(`You already have a link folder ${input.name}`)
}

async function updateLinkFolder(_, { id, input }, { user, models }) {
  await validatePayload({ payload: input, schema: updateLinkFolderSchema })

  const linkFolder = await models.LinkFolder.findById(id).exec()

  if (linkFolder && String(linkFolder.userId) === String(user.id)) {
    const linkFolderNameExists = await models.LinkFolder
      .findOne({ userId: user.id, name: input.name }).exec()

    if (linkFolderNameExists && String(linkFolder.id) !== String(id)) {
      throw new DuplicateInputError(`You already have a link folder ${input.name}`)
    }

    const { name, description } = input;

    const inputToUpdate = {}

    if (name) inputToUpdate.name = name
    if (description) inputToUpdate.description = description

    const updatedLinkFolder = await models.LinkFolder
      .findByIdAndUpdate(id, inputToUpdate, { new: true }).exec()

    return updatedLinkFolder
  }

  throw new NotFoundError('LinkFolder not found')
}

async function getLinkFolderLinks(root, __, { models }) {
  const links = await models.Link.find({ folderId: root.id }).exec()

  return links
}

export const linkFolderResolvers = {
  Query: {
    getLinkFolders: getResource('LinkFolder'),
    getSingleLinkFolder: getSingleResource('LinkFolder')
  },
  Mutation: {
    createLinkFolder,
    updateLinkFolder,
    deleteLinkFolder: deleteResource('LinkFolder')
  },
  LinkFolder: {
    owner: getItemOwner,
    links: getLinkFolderLinks
  }
}
