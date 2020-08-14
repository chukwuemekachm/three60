import { isAuthenticated } from './rules';

const permissions = {
  Query: {
    me: isAuthenticated
  }
}

export default permissions
