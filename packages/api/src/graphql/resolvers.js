import merge from 'lodash/merge'

import { userResolvers } from './user'

const Query = {
  info: () => 'three60 is still a work in progress'
}

const resolvers = { Query }

export default merge({}, resolvers, userResolvers)
