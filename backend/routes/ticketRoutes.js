const express = require('express')
const router = express.Router()
const ticketsController = require('../controllers/ticketsController')
const { protectedRoute } = require('../middleware/authentication')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

router
  .route('/')
  .get(protectedRoute, ticketsController.getAllTickets)
  .post(protectedRoute, ticketsController.createNewTicket)

router
  .route('/:id')
  .get(protectedRoute, ticketsController.getTicketById)
  .patch(protectedRoute, ticketsController.updateTicket)
  .delete(protectedRoute, ticketsController.deleteTicket)

module.exports = router
