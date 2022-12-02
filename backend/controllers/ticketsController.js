const User = require('../models/User')
const Ticket = require('../models/Ticket')
const NotFoundError = require('../errors/not-found')
const BadRequestError = require('../errors/bad-request')
const UnauthorizedError = require('../errors/unauthorized')

// @desc    Get user tickets
// @route   GET /tickets
// @access  Private
const getAllTickets = async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const tickets = await Ticket.find({ user: req.user.id }).lean()

  // If no tickets
  if (!tickets?.length) {
    throw new NotFoundError('No tickets found')
  }

  res.status(200).json(tickets)
}

// @desc   Create new ticket
// @route  POST /tickets
// @access  Private
const createNewTicket = async (req, res) => {
  const { description, product } = req.body

  // Confirm data
  if (!description || !product) {
    throw new BadRequestError('Please add a description and product')
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  // Create and store the new user
  const ticket = await Ticket.create({
    description,
    product,
    status: 'new',
    user: req.user.id,
  })

  if (ticket) {
    return res.status(201).json(ticket)
  } else {
    return res.status(400).json({ message: 'Invalid ticket data received' })
  }
}

// @desc   Get single ticket
// @route  GET /tickets/:id
// @access  Private
const getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).lean().exec()

  if (!ticket) {
    throw new NotFoundError('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    throw new UnauthorizedError('Not Authorized')
  }

  res.status(200).json(ticket)
}

// @desc   Update ticket
// @route  PATCH /tickets/:id
// @access  Private
const updateTicket = async (req, res) => {
  const { status } = req.body

  const ticket = await Ticket.findById(req.params.id).exec()

  if (!ticket) {
    throw new NotFoundError('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    throw new UnauthorizedError('Not Authorized')
  }

  ticket.status = status

  await ticket.save()

  res.status(200).json(ticket)
}

// @desc   Delete ticket
// @route  DELETE /tickets/:id
// @access  Private
const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).exec()

  if (!ticket) {
    throw new NotFoundError('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    throw new UnauthorizedError('Not Authorized')
  }

  await ticket.remove()

  res.status(200).json({ message: 'Ticket deleted', success: true })
}

module.exports = {
  getAllTickets,
  createNewTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
}
