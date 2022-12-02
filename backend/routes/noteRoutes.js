const express = require('express')
const router = express.Router({ mergeParams: true })
const notesController = require('../controllers/notesController')
const { protectedRoute } = require('../middleware/authentication')

router
  .route('/')
  .get(protectedRoute, notesController.getAllNotes)
  .post(protectedRoute, notesController.createNewNote)

module.exports = router
