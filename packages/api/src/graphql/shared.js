import uniqBy from 'lodash/uniqBy'
import escapeStringRegexp from 'escape-string-regexp'

import NotFoundError from '../custom_errors/NotFoundError'

export async function manageUserTags(user, tags, models) {
  try {
    if (Array.isArray(tags) && tags[0]) {
      const { tags: userTags } = await models.User.findById(user.id).exec()
      const updatedTags = uniqBy([...userTags, ...tags], 'title')
      await models.User.findByIdAndUpdate(user.id, { tags: updatedTags }, { new: true }).exec()
    }
    return true
  } catch (error) {
    return true
  }
}

export function getUserSubCollection(modelKey) {
  return async function getUserCollection(root, __, { models }) {
    const subUserCollection = await models[modelKey].find({ userId: root.id }).exec()

    return subUserCollection
  }
}

export async function getItemOwner(root, _, { models }) {
  const owner = await models.User.findById(root.userId)

  return owner
}

function escapeStringFilterValue(value) {
  return { $regex: escapeStringRegexp(value) }
}

export function transformQueryFilters(filters) {
  const filtersClone = { ...filters }
  const queryOptions = {}

  Object.keys(filtersClone).forEach((key) => {
    if (
      typeof filtersClone[key] === 'string'
      && key !== 'id'
      && key !== 'userId'
    ) {
      queryOptions[key] = escapeStringFilterValue(filtersClone[key])
    } else {
      queryOptions[key] = filtersClone[key]
    }
  })

  if (filtersClone.id) {
    delete queryOptions.id
    // eslint-disable-next-line no-underscore-dangle
    queryOptions._id = filtersClone.id
  }

  return queryOptions
}

export function deleteResource(modelKey) {
  return async function deleteUserResource(_, args, { user, models }) {
    const resource = await models[modelKey].findById(args.id).exec()

    if (resource && String(resource.userId) === String(user.id)) {
      await models[modelKey].findOneAndRemove({ _id: resource.id })
      return args.id
    }

    throw new NotFoundError(`${modelKey} not found`)
  }
}

export function getResource(modelKey) {
  return async function getItems(_, { input }, { user, models }) {
    const todos = await models[modelKey]
      .find(transformQueryFilters({ ...input, userId: user.id })).exec()

    return todos
  }
}

export function getSingleResource(modelKey) {
  return async function getItem(_, { input }, { user, models }) {
    const resource = await models[modelKey]
      .findOne(transformQueryFilters({ ...input, userId: user.id })).exec()

    if (resource && String(resource.userId) === String(user.id)) {
      return resource
    }

    throw new NotFoundError(`${modelKey} not found`)
  }
}
