const { Todo } = require('../models')

class TodoController {
  static add(req, res, next) {
    let { task, desc, dueDate, status } = req.body
    Todo.create({
      task,
      desc,
      status,
      dueDate,
      UserId: req.currentUserId
    })
      .then((todo) => {
        res.status(201).json({ todo })
      })
      .catch(next)
  }

  static displayAll(req, res, next) {
    Todo.findAll({
      where: {
        UserId: req.currentUserId
      }
    })
      .then((todo) => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static displayOne(req, res, next) {
    let id = req.params.id
    Todo.findByPk(id)
      .then((todo) => {
        if (todo) {
          res.status(200).json(todo)
        } else {
          next({ name: 'Not found' })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  static update(req, res, next) {
    let id = req.params.id
    let { task, desc, status, dueDate } = req.body
    Todo.update({
      task,
      desc,
      status,
      dueDate
    }, {
      where: {
        id: id
      },
      returning: true
    })
      .then((data) => {
        if (data[1]) {
          res.status(200).json({ data: data[1][0] })
        }
        else {
          next({ name: 'Not found' })
        }
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    let deletedTodo;
    Todo.findByPk(id)
      .then((todo) => {
        if (todo) {
          deletedTodo = todo
          return Todo.destroy({
            where: {
              id: id
            }
          })
        }
        else {
          next({ name: 'Not found' })

        }
      })
      .then(result => {
        if (result) {
          res.status(200).json(deletedTodo)
        }
        else {
          next({ name: 'Not found' })

        }
      })
      .catch(next)
  }
}

module.exports = TodoController