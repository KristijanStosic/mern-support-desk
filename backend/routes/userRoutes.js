const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const { protectedRoute } = require('../middleware/authentication')

router.route('/my-profile').get(protectedRoute, usersController.getUserProfile)

module.exports = router
