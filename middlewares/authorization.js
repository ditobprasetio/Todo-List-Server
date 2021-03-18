const { Todo } = require('../models')

function authorization(req, res, next) {
  Todo.findOne({
    where: {
      id: req.params.id,
      UserId: req.currentUserId
    }
  })
  .then((todo) => {
    if(todo) {
      next()
    }
    else{
      res.status(401).json({ name:'Not Found' })
    }
  })
  .catch((err) => {
    res.status(401).json({ name:'Not Atuhorized' })
  })
}

module.exports = authorization