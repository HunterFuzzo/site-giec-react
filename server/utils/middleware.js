import jwt from 'jsonwebtoken'
import { getPool } from './poolUtils.js'

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    // authHeader not provided means no token which uses any pool
    req.pool = getPool(undefined)

    return next()
  }

  const token = authHeader.split(' ')[1]

  // Verify the token
  jwt.verify(token, 'secretKey', (err, user) => {
    //TODO: generate secret
    if (err) {
      console.log(err)
      // return res.sendStatus(403) //TODO: instead of this send back pool
    }
    // If token is valid, attach the user object to the request
    req.user = user
    req.pool = getPool(user)
    next()
  })
}

export default authenticateToken
