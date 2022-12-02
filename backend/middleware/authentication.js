const jwt = require('jsonwebtoken')
const User = require('../models/User')
const UnauthorizedError = require('../errors/unauthorized')
const ForbiddenError = require('../errors/forbidden')

const protectedRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
    throw new UnauthorizedError('Please login to access this route')
  }

  let token
  try {
    // Get token from header
    token = authHeader.split(' ')[1]
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      throw new ForbiddenError('Forbidden or token has expipred')
    }
    // Get user from token
    req.user = await User.findById(decoded.userId).select('-password')

    if (!req.user) {
      throw new UnauthorizedError('Not authorized')
    }

    next()
  } catch (error) {
    console.log(error)
    throw new UnauthorizedError('Not authorized')
  }

  if (!token) {
    throw new UnauthorizedError('Not authorized. No token')
  }
}

module.exports = { protectedRoute }
