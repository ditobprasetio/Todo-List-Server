const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const authorization = require('../middlewares/authorization')

router.post('/', TodoController.add)
router.get('/', TodoController.displayAll)
router.get('/:id', authorization, TodoController.displayOne)
router.put('/:id', authorization, TodoController.update)
router.delete('/:id', authorization, TodoController.delete)

module.exports = router