const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const apiRouter = require('./api')
const todoRouter = require('./todo')
const authentication = require('../middlewares/authentication')

router.use('/', userRouter)
router.use('/api', apiRouter)
router.use(authentication)
router.use('/todos', todoRouter)

module.exports = router