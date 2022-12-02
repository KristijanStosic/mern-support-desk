require('dotenv').config()
const connectDB = require('./config/db')
const users = require('./data/users')
const notes = require('./data/notes')
const tickets = require('./data/tickets')
const User = require('./models/User')
const Ticket = require('./models/Ticket')
const Note = require('./models/Note')

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Ticket.deleteMany()
    await Note.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleTickets = tickets.map((ticket) => {
      return { ...ticket, user: adminUser }
    })

    const createdTickets = await Ticket.insertMany(sampleTickets)
    const ticket = createdTickets[0]._id

    const sampleNotes = notes.map((note) => {
      return { ...note, ticket: ticket, user: adminUser }
    })

    await Note.insertMany(sampleNotes)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Note.deleteMany()
    await Ticket.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
