const User = require('../models/User')
const Ticket = require('../models/Ticket')
const Note = require('../models/Note')
const NotFoundError = require('../errors/not-found')
const BadRequestError = require('../errors/bad-request')
const UnauthorizedError = require('../errors/unauthorized')

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getAllNotes = async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId).lean()

  if (ticket.user.toString() !== req.user.id) {
    throw new UnauthorizedError('Not Authorized')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  // If no notes
  // if (!notes?.length) {
  //   throw new NotFoundError('No notes found')
  // }

  res.status(200).json(notes)
}

// @desc    Create new note for a ticket
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const createNewNote = async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId).lean()

  if (ticket.user.toString() !== req.user.id) {
    throw new UnauthorizedError('Not Authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  })

  if (note) {
    return res.status(201).json(note)
  } else {
    return res.status(400).json({ message: 'Invalid note data received' })
  }
}

module.exports = {
  getAllNotes,
  createNewNote,
}
