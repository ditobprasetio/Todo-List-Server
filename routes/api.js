const express = require('express')
const router = express.Router()
const ApiController = require('../controllers/apiController')

router.get('/', ApiController.getQuotes)

module.exports = router