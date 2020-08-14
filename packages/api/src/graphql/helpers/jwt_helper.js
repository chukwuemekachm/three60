import jwt from 'jsonwebtoken'

const { APP_SECRET = 'APP_SECRET' } = process.env

export function generateToken(payload) {
  return jwt.sign(payload, APP_SECRET, { expiresIn: '72h' })
}

export function decodeToken({ request }) {
  try {
    const authorization = request.get('Authorization')
    if (authorization) {
      const token = authorization.replace('Bearer ', '')
      return jwt.verify(token, APP_SECRET)
    }
    return false
  } catch (error) {
    return false
  }
}
