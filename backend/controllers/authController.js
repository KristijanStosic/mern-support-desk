const User = require('../models/User')
//Errors
const BadRequestError = require('../errors/bad-request')
const ConflictError = require('../errors/conflict')
const UnauthorizedError = require('../errors/unauthorized')
const NotFoundError = require('../errors/not-found')
const {
  validatePassword,
  checkPasswordValidity,
} = require('../utils/validatePassword')

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public
const register = async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    throw new BadRequestError('Please include all fields')
  }

  let passwordMessage = checkPasswordValidity(password)

  if (passwordMessage) {
    throw new BadRequestError(passwordMessage)
  }

  // Find if user already exists
  const duplicate = await User.findOne({ email }).lean().exec()

  if (duplicate) {
    throw new ConflictError('User already exists with this email')
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  })

  const token = user.createJWT()

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    })
  } else {
    throw new BadRequestError('Invalid user data')
  }
}

// @desc    Login a user
// @route   POST /auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).exec()

  if (!user) {
    throw new NotFoundError('User with this email does not exist')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Incorrect password')
  }

  const token = user.createJWT()

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token,
  })
}

module.exports = {
  register,
  login,
}
